package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.FavoriteResponse;
import com.example.TheHeathensStore.entity.FavoriteItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.mapper.FavoriteItemMapper;
import com.example.TheHeathensStore.repository.FavoriteItemRepository;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FavoriteServiceTest {

    @Mock
    private FavoriteItemRepository favoriteItemRepository;

    @Mock
    private ProductImageRepository productImageRepository;

    @Mock
    private FavoriteItemMapper favoriteItemMapper;

    @Mock
    private ProductRepository productRepository;

    @Test
    void shouldDeleteFavoriteAndReturnLatestEmptySnapshot() {
        UUID userUuid = UUID.randomUUID();
        UUID productUuid = UUID.randomUUID();
        Product product = Product.builder()
                                 .id(10L)
                                 .uuid(productUuid)
                                 .build();
        FavoriteItem favoriteItem = FavoriteItem.builder()
                                                 .id(20L)
                                                 .userId(4L)
                                                 .product(product)
                                                 .build();

        when(productRepository.findByUuid(productUuid)).thenReturn(Optional.of(product));
        when(favoriteItemRepository.findByUserIdAndProductId(4L, 10L)).thenReturn(Optional.of(favoriteItem));
        when(favoriteItemRepository.findByUserId(4L)).thenReturn(List.of());
        when(productImageRepository.findAllByProductIdInAndIsThumbnailTrue(anyList())).thenReturn(List.of());

        FavoriteResponse result = service().deleteFromFavorite(4L, userUuid, productUuid);

        verify(favoriteItemRepository).delete(favoriteItem);
        assertEquals(userUuid, result.getUserUuid());
        assertEquals(List.of(), result.getFavoriteItems());
    }

    private FavoriteService service() {
        return new FavoriteService(
                favoriteItemRepository,
                productImageRepository,
                favoriteItemMapper,
                productRepository
        );
    }
}
