package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponseMin;
import com.example.TheHeathensStore.mapper.ProductMapper;
import com.example.TheHeathensStore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final int PAGE_SIZE = 16;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public Page<ProductResponseMin> getShop(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE);
        return productRepository.findByIsActiveTrue(pageable).map(product -> {
            return productMapper.entityToProductResponseMin(product,null);
        });
    }
}
