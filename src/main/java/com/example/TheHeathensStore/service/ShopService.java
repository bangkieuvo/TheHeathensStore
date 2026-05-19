package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.mapper.ProductMapper;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final int PAGE_SIZE = 16;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductImageRepository productImageRepository;

    public Page<ProductResponse> getShop(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE);
        return productRepository.findByIsActiveTrue(pageable)
                                .map(product -> {
                                    return productMapper.entityToResponse(
                                            product,
                                            productImageRepository.findByProductId(
                                                    product.getId()
                                            )
                                    );
                                });
    }
}
