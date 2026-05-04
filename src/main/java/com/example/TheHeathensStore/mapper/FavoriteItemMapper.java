package com.example.TheHeathensStore.mapper;

import com.example.TheHeathensStore.dto.response.FavoriteItemResponse;
import com.example.TheHeathensStore.entity.FavoriteItem;
import com.example.TheHeathensStore.entity.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FavoriteItemMapper {
    private final ProductMapper productMapper;

    public FavoriteItemResponse entityToResponse(FavoriteItem favoriteItem, ProductImage thumbnail) {
        if (favoriteItem == null)
            return null;
        return FavoriteItemResponse.builder()
                                   .id(favoriteItem.getId())
                                   .productInfo(productMapper.entityToProductResponseMin(favoriteItem.getProduct(), thumbnail))
                                   .build();
    }
}
