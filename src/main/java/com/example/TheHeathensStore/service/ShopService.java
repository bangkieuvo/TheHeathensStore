package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.filter.ProductFilter;
import com.example.TheHeathensStore.filter.ProductSort;
import com.example.TheHeathensStore.mapper.ProductMapper;
import com.example.TheHeathensStore.repository.ProductImageRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import com.example.TheHeathensStore.repository.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final int PAGE_SIZE = 16;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductImageRepository productImageRepository;

    public Page<ProductResponse> getShop(int pageIndex) {
        if (pageIndex < 0) {
            throw new InvalidRequestException("Invalid page number");
        }
        Pageable pageable = PageRequest.of(pageIndex, PAGE_SIZE);
        return productRepository.findByIsActiveTrue(pageable)
                                .map(product -> productMapper.entityToResponse(
                                        product,
                                        productImageRepository.findByProductId(
                                                product.getId()
                                        )
                                ));
    }

    public Page<ProductResponse> getShopWithFilter(int pageIndex, ProductFilter productFilter, String sort) {
        if (pageIndex < 0) {
            throw new InvalidRequestException("Invalid page number");
        }
        Pageable pageable = PageRequest.of(pageIndex, PAGE_SIZE, ProductSort.fromValue(sort)
                                                                             .toSort());
        Specification<Product> specification = ProductSpecification.filterProduct(productFilter);
        return productRepository.findAll(specification, pageable)
                                .map(product -> {
                                    return productMapper.entityToResponse(
                                            product,
                                            productImageRepository.findByProductId(
                                                    product.getId()
                                            )
                                    );
                                });
    }

    public List<ProductResponse> getFeatureProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductResponse> productResponses = new ArrayList<>();
        for (int i = 0; i < (productResponses.size() - 1) || i < 8; i++) {
            productResponses.add(productMapper.entityToResponse(products.get(i), productImageRepository.findByProductId(products.get(i)
                                                                                                                                .getId())));
        }
        return productResponses;
    }
}
