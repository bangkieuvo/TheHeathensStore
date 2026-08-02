package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.CartItemResponse;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.entity.CartItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.exception.InsufficientStockException;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
import com.example.TheHeathensStore.mapper.CartItemMapper;
import com.example.TheHeathensStore.repository.CartItemRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final ProductImageRepository productImageRepository;
    private final CartItemMapper cartItemMapper;
    private final ProductRepository productRepository;

    public CartResponse getCart(Long userId, UUID userUuid) {
        if (userId == null || userUuid == null) return null;
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        List<Long> productIds = cartItems.stream()
                                         .map(item -> item.getProduct()
                                                          .getId())
                                         .toList();
        Map<Long, ProductImage> productThumbnails = productImageRepository.findAllByProductIdInAndIsThumbnailTrue(productIds)
                                                                          .stream()
                                                                          .collect(Collectors
                                                                                  .toMap(ProductImage::getProductId, productImage -> productImage)
                                                                          );

        List<CartItemResponse> cartItemResponses = cartItems.stream()
                                                            .map(cartItem -> {
                                                                return cartItemMapper.entityToResponse(cartItem, productThumbnails.get(cartItem.getProduct()
                                                                                                                                               .getId()));
                                                            })
                                                            .toList();
        BigDecimal totalPrice = cartItemResponses.stream()
                                                 .map(CartItemResponse::getSubTotal)
                                                 .reduce(BigDecimal.ZERO, BigDecimal::add);
        return CartResponse.builder()
                           .userUuid(userUuid)
                           .cartItems(cartItemResponses)
                           .cartTotal(totalPrice)
                           .build();
    }

    @Transactional
    public CartResponse addToCart(Long userId, UUID userUuid, UUID productUuid) {
        return addToCart(userId, userUuid, productUuid, 1L);
    }

    @Transactional
    public CartResponse addToCart(Long userId, UUID userUuid, UUID productUuid, Long quantity) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        if (quantity == null || quantity <= 0) {
            throw new InvalidRequestException("quantity is invalid");
        }
        Product product = findProduct(productUuid);
        validateProductAvailability(product);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                              .orElse(null);
        if (cartItem != null) {
            long newQuantity;
            try {
                newQuantity = Math.addExact(cartItem.getQuantity(), quantity);
            } catch (ArithmeticException exception) {
                throw new InvalidRequestException("Cart quantity is too large", exception);
            }
            if (newQuantity > product.getStock()) {
                throw new InsufficientStockException("Product " + productUuid + " has insufficient stock");
            }
            cartItem.setQuantity(newQuantity);
        } else {
            if (quantity > product.getStock()) {
                throw new InsufficientStockException("Product " + productUuid + " has insufficient stock");
            }
            cartItem = CartItem.builder()
                               .userId(userId)
                               .product(product)
                               .quantity(quantity)
                               .build();
            cartItemRepository.save(cartItem);
        }
        return getCart(userId, userUuid);
    }

    @Transactional
    public CartResponse addItems(Long userId, UUID userUuid, Map<UUID, Long> requestedQuantities) {
        Map<UUID, Long> quantities = new LinkedHashMap<>(requestedQuantities);
        for (Map.Entry<UUID, Long> requestedItem : quantities.entrySet()) {
            Product product = findProduct(requestedItem.getKey());
            validateProductAvailability(product);
            Long quantity = requestedItem.getValue();
            if (quantity == null || quantity <= 0) {
                throw new InvalidRequestException("Cart quantity is invalid");
            }
            CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                                  .orElseGet(() -> CartItem.builder()
                                                                          .userId(userId)
                                                                          .product(product)
                                                                          .quantity(0L)
                                                                          .build());
            long newQuantity;
            try {
                newQuantity = Math.addExact(cartItem.getQuantity(), quantity);
            } catch (ArithmeticException exception) {
                throw new InvalidRequestException("Cart quantity is too large", exception);
            }
            if (newQuantity > product.getStock()) {
                throw new InsufficientStockException("Product " + product.getUuid() + " has insufficient stock");
            }
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
        }
        return getCart(userId, userUuid);
    }

    @Transactional
    public CartResponse updateCartItem(Long userId, UUID userUuid, UUID productUuid, Long newQuantity) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        if (newQuantity == null || newQuantity <= 0) {
            throw new InvalidRequestException("newQuantity is invalid");
        }
        Product product = findProduct(productUuid);
        validateProductAvailability(product);
        if (newQuantity > product.getStock()) {
            throw new InsufficientStockException("Product " + productUuid + " has insufficient stock");
        }
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Product " + productUuid + " is not in cart"
                                              ));
        cartItem.setQuantity(newQuantity);
        return getCart(userId, userUuid);
    }

    @Transactional
    public CartResponse deleteFromCart(Long userId, UUID userUuid, UUID productUuid) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        Product product = findProduct(productUuid);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Product " + productUuid + " is not in cart"
                                              ));
        cartItemRepository.delete(cartItem);
        return getCart(userId, userUuid);
    }

    private Product findProduct(UUID productUuid) {
        return productRepository.findByUuid(productUuid)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                        "Product " + productUuid + " was not found"
                                ));
    }

    private void validateProductAvailability(Product product) {
        if (!product.isActive()) {
            throw new InvalidRequestException("Product " + product.getUuid() + " is not available");
        }
        if (product.getStock() <= 0) {
            throw new InsufficientStockException("Product " + product.getUuid() + " is out of stock");
        }
    }
}
