package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.CartItemResponse;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.entity.CartItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
import com.example.TheHeathensStore.mapper.CartItemMapper;
import com.example.TheHeathensStore.mapper.ProductMapper;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final ProductImageRepository productImageRepository;
    private final CartItemMapper cartItemMapper;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

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
    public CartItemResponse addToCart(Long userId, UUID productUuid) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        Product product = findProduct(productUuid);
        ProductImage productImage = productImageRepository.findByProductIdAndIsThumbnailTrue(product.getId())
                                                          .orElse(null);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                              .orElse(null);
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            return cartItemMapper.entityToResponse(cartItem, productImage);
        }
        cartItem = CartItem.builder()
                           .userId(userId)
                           .product(product)
                           .quantity(1L)
                           .build();
        cartItemRepository.save(cartItem);
        return cartItemMapper.entityToResponse(cartItem, productImage);
    }
    @Transactional
    public CartItemResponse updateCartItem(Long userId, UUID productUuid, Long newQuantity) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        if (newQuantity == null || newQuantity <= 0) {
            throw new InvalidRequestException("newQuantity is invalid");
        }
        Product product = findProduct(productUuid);
        ProductImage productImage = productImageRepository.findByProductIdAndIsThumbnailTrue(product.getId())
                                                          .orElse(null);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Product " + productUuid + " is not in cart"
                                              ));
        cartItem.setQuantity(newQuantity);
        return cartItemMapper.entityToResponse(cartItem, productImage);
    }

    @Transactional
    public void deleteFromCart(Long userId, UUID productUuid) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        Product product = findProduct(productUuid);
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Product " + productUuid + " is not in cart"
                                              ));
        cartItemRepository.delete(cartItem);
    }

    private Product findProduct(UUID productUuid) {
        return productRepository.findByUuid(productUuid)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                        "Product " + productUuid + " was not found"
                                ));
    }
}
