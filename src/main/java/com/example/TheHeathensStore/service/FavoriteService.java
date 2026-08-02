package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.FavoriteItemResponse;
import com.example.TheHeathensStore.dto.response.FavoriteResponse;
import com.example.TheHeathensStore.entity.FavoriteItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
import com.example.TheHeathensStore.mapper.FavoriteItemMapper;
import com.example.TheHeathensStore.repository.FavoriteItemRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteItemRepository favoriteItemRepository;
    private final ProductImageRepository productImageRepository;
    private final FavoriteItemMapper favoriteItemMapper;
    private final ProductRepository productRepository;

    public FavoriteResponse getFavorites(Long userId, UUID userUuid) {
        if (userId == null || userUuid == null) return null;
        List<FavoriteItem> favoriteItems = favoriteItemRepository.findByUserId(userId);
        List<Long> productIds = favoriteItems.stream()
                                             .map(item -> item.getProduct()
                                                              .getId())
                                             .toList();
        Map<Long, ProductImage> productThumbnails = productImageRepository.findAllByProductIdInAndIsThumbnailTrue(productIds)
                                                                          .stream()
                                                                          .collect(Collectors
                                                                                  .toMap(ProductImage::getProductId, productImage -> productImage)
                                                                          );

        List<FavoriteItemResponse> favoriteItemResponses = favoriteItems.stream()
                                                                        .map(favoriteItem -> favoriteItemMapper.entityToResponse(
                                                                                favoriteItem,
                                                                                productThumbnails.get(favoriteItem.getProduct()
                                                                                                                  .getId())
                                                                        ))
                                                                        .toList();
        return FavoriteResponse.builder()
                               .userUuid(userUuid)
                               .favoriteItems(favoriteItemResponses)
                               .build();
    }

    @Transactional
    public FavoriteResponse addToFavorite(Long userId, UUID userUuid, UUID productUuid) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        Product product = findProduct(productUuid);
        FavoriteItem favoriteItem = favoriteItemRepository.findByUserIdAndProductId(userId, product.getId())
                                                           .orElse(null);
        if (favoriteItem == null) {
            favoriteItem = FavoriteItem.builder()
                                       .userId(userId)
                                       .product(product)
                                       .build();
            favoriteItemRepository.save(favoriteItem);
        }
        return getFavorites(userId, userUuid);
    }

    @Transactional
    public FavoriteResponse deleteFromFavorite(Long userId, UUID userUuid, UUID productUuid) {
        if (productUuid == null) {
            throw new InvalidRequestException("productUuid is invalid");
        }
        Product product = findProduct(productUuid);
        FavoriteItem favoriteItem = favoriteItemRepository.findByUserIdAndProductId(userId, product.getId())
                                                           .orElseThrow(() -> new ResourceNotFoundException(
                                                                   "Product " + productUuid + " is not in favorite"
                                                           ));
        favoriteItemRepository.delete(favoriteItem);
        return getFavorites(userId, userUuid);
    }

    private Product findProduct(UUID productUuid) {
        return productRepository.findByUuid(productUuid)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                        "Product " + productUuid + " was not found"
                                ));
    }
}
