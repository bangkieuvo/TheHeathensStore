package com.example.TheHeathensStore.mapper;

import com.example.TheHeathensStore.dto.response.ProductImageResponse;
import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.dto.response.ProductResponseMin;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMapper {
    private final ProductImageMapper productImageMapper;

    public ProductResponse entityToResponse(Product product, List<ProductImage> productImages) {
        List<ProductImageResponse> productImageResponses = productImages.stream()
                                                                        .map(productImageMapper::entityToResponse)
                                                                        .toList();
        ProductImageResponse thumbnail = productImageResponses.stream()
                                                      .filter(ProductImageResponse::getIsThumbnail)
                                                      .findFirst()
                                                      .orElse(null);
        List<ProductImageResponse> otherImages = productImageResponses.stream()
                                                              .filter(img -> !img.getIsThumbnail())
                                                              .toList();
        return ProductResponse.builder()
                              .uuid(product.getUuid())
                              .name(product.getName())
                              .price(product.getPrice())
                              .stock(product.getStock())
                              .description(product.getDescription())
                              .jerseyType(product.getJerseyType()
                                                 .toString())
                              .teamName(product.getTeam()
                                               .getName())
                              .season(product.getSeason()
                                             .getName())
                              .thumbnail(thumbnail)
                              .images(otherImages)
                              .build();
    }

    public ProductResponseMin entityToProductResponseMin(Product product, ProductImage thumbnail) {
        String thumbnailUrl = null;
        if (thumbnail != null) {
            thumbnailUrl = thumbnail.getImageUrl();
        }
        return ProductResponseMin.builder()
                                 .uuid(product.getUuid())
                                 .name(product.getName())
                                 .price(product.getPrice())
                                 .stock(product.getStock())
                                 .jerseyType(product.getJerseyType()
                                                    .toString())
                                 .teamName(product.getTeam()
                                                  .getName())
                                 .season(product.getSeason()
                                                .getName())
                                 .thumbnailUrl(thumbnailUrl)
                                 .build();
    }
}
