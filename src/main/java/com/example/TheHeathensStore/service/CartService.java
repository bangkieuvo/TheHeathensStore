package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.CartItemResponse;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.entity.CartItem;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.mapper.CartItemMapper;
import com.example.TheHeathensStore.repository.CartItemRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import com.example.TheHeathensStore.repository.UserRepository;
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
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final CartItemMapper cartItemMapper;
    private final UserRepository userRepository;

    public CartResponse getCartByUuid(UUID uuid) {
        return getCartByUser(userRepository.findByUuid(uuid)
                                           .orElse(null));
    }

    public CartResponse getCartByUser(User user) {
        if (user == null) return null;
        List<CartItem> cartItems = cartItemRepository.findByUserId(user.getId());
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
                           .userUuid(user.getUuid())
                           .cartItems(cartItemResponses)
                           .cartTotal(totalPrice)
                           .build();
    }
}
