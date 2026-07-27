package com.example.TheHeathensStore.mapper;

import com.example.TheHeathensStore.dto.response.ProductImageResponse;
import com.example.TheHeathensStore.entity.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductImageMapper {
    public ProductImageResponse entityToResponse(ProductImage productImage) {
        return ProductImageResponse.builder()
                                   .id(productImage.getId())
                                   .url(productImage.getImageUrl())
                                   .isThumbnail(productImage.isThumbnail())
                                   .build();
    }
}
