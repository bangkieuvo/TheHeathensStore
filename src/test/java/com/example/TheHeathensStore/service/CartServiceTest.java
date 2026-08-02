package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.CartItemResponse;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.entity.CartItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.exception.InsufficientStockException;
import com.example.TheHeathensStore.mapper.CartItemMapper;
import com.example.TheHeathensStore.repository.CartItemRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private ProductImageRepository productImageRepository;

    @Mock
    private CartItemMapper cartItemMapper;

    @Mock
    private ProductRepository productRepository;

    @Test
    void shouldIncrementQuantityAndReturnLatestCartSnapshot() {
        UUID userUuid = UUID.randomUUID();
        UUID productUuid = UUID.randomUUID();
        Product product = product(productUuid, 5L);
        CartItem cartItem = CartItem.builder()
                                    .id(11L)
                                    .userId(4L)
                                    .product(product)
                                    .quantity(1L)
                                    .build();
        CartItemResponse itemResponse = CartItemResponse.builder()
                                                        .id(11L)
                                                        .quantity(2L)
                                                        .subTotal(new BigDecimal("200.00"))
                                                        .build();

        when(productRepository.findByUuid(productUuid)).thenReturn(Optional.of(product));
        when(cartItemRepository.findByUserIdAndProductId(4L, 10L)).thenReturn(Optional.of(cartItem));
        when(cartItemRepository.findByUserId(4L)).thenReturn(List.of(cartItem));
        when(productImageRepository.findAllByProductIdInAndIsThumbnailTrue(anyList())).thenReturn(List.of());
        when(cartItemMapper.entityToResponse(cartItem, null)).thenReturn(itemResponse);

        CartResponse result = service().addToCart(4L, userUuid, productUuid);

        assertEquals(2L, cartItem.getQuantity());
        assertEquals(userUuid, result.getUserUuid());
        assertEquals(List.of(itemResponse), result.getCartItems());
        assertEquals(new BigDecimal("200.00"), result.getCartTotal());
    }

    @Test
    void shouldRejectIncrementWhenCartQuantityReachedStock() {
        UUID productUuid = UUID.randomUUID();
        Product product = product(productUuid, 1L);
        CartItem cartItem = CartItem.builder()
                                    .userId(4L)
                                    .product(product)
                                    .quantity(1L)
                                    .build();

        when(productRepository.findByUuid(productUuid)).thenReturn(Optional.of(product));
        when(cartItemRepository.findByUserIdAndProductId(4L, 10L)).thenReturn(Optional.of(cartItem));

        assertThrows(
                InsufficientStockException.class,
                () -> service().addToCart(4L, UUID.randomUUID(), productUuid)
        );

        assertEquals(1L, cartItem.getQuantity());
        verify(cartItemRepository, never()).findByUserId(4L);
    }

    private CartService service() {
        return new CartService(
                cartItemRepository,
                productImageRepository,
                cartItemMapper,
                productRepository
        );
    }

    private Product product(UUID productUuid, Long stock) {
        return Product.builder()
                      .id(10L)
                      .uuid(productUuid)
                      .name("Product")
                      .price(new BigDecimal("100.00"))
                      .stock(stock)
                      .isActive(true)
                      .build();
    }
}
