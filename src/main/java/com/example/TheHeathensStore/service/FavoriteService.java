package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.FavoriteItemResponse;
import com.example.TheHeathensStore.dto.response.FavoriteResponse;
import com.example.TheHeathensStore.entity.FavoriteItem;
import com.example.TheHeathensStore.entity.ProductImage;
import com.example.TheHeathensStore.entity.User;
import com.example.TheHeathensStore.mapper.FavoriteItemMapper;
import com.example.TheHeathensStore.repository.FavoriteItemRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.UserRepository;
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
    private final UserRepository userRepository;

    public FavoriteResponse getFavoriteByUuid(UUID uuid) {
        return getFavoriteByUser(userRepository.findByUuid(uuid)
                                               .orElse(null));
    }

    public FavoriteResponse getFavoriteByUser(User user) {
        if (user == null) return null;
        List<FavoriteItem> favoriteItems = favoriteItemRepository.findByUserId(user.getId());
        List<Long> productIds = favoriteItems.stream()
                                             .map(item -> item.getProduct()
                                                              .getId())
                                             .toList();
        Map<Long, ProductImage> productThumbnails = productImageRepository.findAllByProductIdInAndIsThumbnailTrue(productIds)
                                                                          .stream()
                                                                          .collect(Collectors
                                                                                  .toMap(ProductImage::getProductId, productImage -> productImage)
                                                                          );

        List<FavoriteItemResponse> cartItemResponses = favoriteItems.stream()
                                                                    .map(cartItem -> {
                                                                        return favoriteItemMapper.entityToResponse(cartItem, productThumbnails.get(cartItem.getProduct()
                                                                                                                                                           .getId()));
                                                                    })
                                                                    .toList();
        return FavoriteResponse.builder()
                               .userUuid(user.getUuid())
                               .favoriteItems(cartItemResponses)
                               .build();
    }
}
