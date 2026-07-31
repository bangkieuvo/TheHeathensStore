package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.filter.ProductFilter;
import com.example.TheHeathensStore.mapper.ProductMapper;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ShopServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @Mock
    private ProductImageRepository productImageRepository;

    @Test
    void shouldReturnEmptyPageForNoMatchWhileKeepingFilterSortAndPagination() {
        ProductFilter filter = new ProductFilter();
        filter.setKeyword("united");
        filter.setSeasonName("2025-2026");
        Page<Product> emptyProductPage = new PageImpl<>(List.of());

        when(productRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(emptyProductPage);

        ShopService shopService = new ShopService(productRepository, productMapper, productImageRepository);
        Page<ProductResponse> result = shopService.getShopWithFilter(2, filter, "price_asc");

        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(productRepository).findAll(any(Specification.class), pageableCaptor.capture());
        Pageable pageable = pageableCaptor.getValue();

        assertEquals("united", filter.getKeyword());
        assertEquals("2025-2026", filter.getSeasonName());
        assertEquals(2, pageable.getPageNumber());
        assertEquals(16, pageable.getPageSize());
        assertEquals(Sort.Direction.ASC, pageable.getSort().getOrderFor("price").getDirection());
        assertEquals(Sort.Direction.ASC, pageable.getSort().getOrderFor("id").getDirection());
        assertTrue(result.isEmpty());
    }
}
