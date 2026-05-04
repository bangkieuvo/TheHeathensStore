package com.example.TheHeathensStore.mapper;

import com.example.TheHeathensStore.dto.response.CartItemResponse;
import com.example.TheHeathensStore.entity.CartItem;
import com.example.TheHeathensStore.entity.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartItemMapper {
    private final ProductMapper productMapper;

    public CartItemResponse entityToResponse(CartItem cartItem, ProductImage thumbnail) {
        if (cartItem == null)
            return null;
        return CartItemResponse.builder()
                               .id(cartItem.getId())
                               .productInfo(productMapper.entityToProductResponseMin(cartItem.getProduct(), thumbnail))
                               .quantity(cartItem.getQuantity())
                               .subTotal(cartItem.getSubTotal())
                               .build();
    }

}
