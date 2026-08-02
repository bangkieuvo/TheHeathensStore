package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.response.ProductResponse;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
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

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShopService {
    private static final int DEFAULT_PAGE_SIZE = 16;
    private static final int MAX_PAGE_SIZE = 100;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductImageRepository productImageRepository;

    public Page<ProductResponse> getShop(int pageIndex) {
        if (pageIndex < 0) {
            throw new InvalidRequestException("Invalid page number");
        }
        Pageable pageable = PageRequest.of(pageIndex, DEFAULT_PAGE_SIZE);
        return productRepository.findByIsActiveTrue(pageable)
                                .map(product -> productMapper.entityToResponse(
                                        product,
                                        productImageRepository.findByProductId(
                                                product.getId()
                                        )
                                ));
    }

    public Page<ProductResponse> getShopWithFilter(int pageIndex, ProductFilter productFilter, String sort) {
        return getShopWithFilter(pageIndex, DEFAULT_PAGE_SIZE, productFilter, sort);
    }

    public Page<ProductResponse> getShopWithFilter(
            int pageIndex,
            int pageSize,
            ProductFilter productFilter,
            String sort
    ) {
        if (pageIndex < 0) {
            throw new InvalidRequestException("Invalid page number");
        }
        if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
            throw new InvalidRequestException("Page size must be between 1 and " + MAX_PAGE_SIZE);
        }
        validateFilter(productFilter);
        Pageable pageable = PageRequest.of(pageIndex, pageSize, ProductSort.fromValue(sort)
                                                                             .toSort());
        Specification<Product> specification = ProductSpecification.filterProduct(productFilter);
        return productRepository.findAll(specification, pageable)
                                .map(this::toResponse);
    }

    public List<ProductResponse> getFeatureProducts() {
        return productRepository.findByIsActiveTrue(PageRequest.of(0, 8, ProductSort.NEWEST.toSort()))
                                .stream()
                                .map(this::toResponse)
                                .toList();
    }

    public ProductResponse getProduct(UUID uuid) {
        Product product = productRepository.findActiveByUuid(uuid)
                                           .orElseThrow(() -> new ResourceNotFoundException(
                                                   "Product " + uuid + " was not found"
                                           ));
        return toResponse(product);
    }

    public List<ProductResponse> getRelatedProducts(UUID uuid) {
        Product product = productRepository.findActiveByUuid(uuid)
                                           .orElseThrow(() -> new ResourceNotFoundException(
                                                   "Product " + uuid + " was not found"
                                           ));
        if (product.getTeam() == null) {
            return List.of();
        }
        return productRepository.findTop4ByIsActiveTrueAndTeam_IdAndUuidNotOrderByCreatedAtDesc(
                                        product.getTeam().getId(),
                                        uuid
                                )
                                .stream()
                                .map(this::toResponse)
                                .toList();
    }

    public List<ProductResponse> getSuggestions(String keyword, int limit) {
        if (keyword == null || keyword.isBlank()) {
            return List.of();
        }
        if (limit < 1 || limit > 10) {
            throw new InvalidRequestException("Suggestion limit must be between 1 and 10");
        }
        ProductFilter filter = new ProductFilter();
        filter.setKeyword(keyword);
        return getShopWithFilter(0, limit, filter, "best_selling").getContent();
    }

    private ProductResponse toResponse(Product product) {
        return productMapper.entityToResponse(
                product,
                productImageRepository.findByProductId(product.getId())
        );
    }

    private void validateFilter(ProductFilter filter) {
        if (filter.getMinPrice() != null && filter.getMinPrice().signum() < 0
                || filter.getMaxPrice() != null && filter.getMaxPrice().signum() < 0) {
            throw new InvalidRequestException("Product price filter cannot be negative");
        }
        if (filter.getMinPrice() != null && filter.getMaxPrice() != null
                && filter.getMinPrice().compareTo(filter.getMaxPrice()) > 0) {
            throw new InvalidRequestException("Minimum price cannot be greater than maximum price");
        }
        if (filter.getJerseyType() != null && !filter.getJerseyType().isBlank()) {
            try {
                Product.JerseyType.valueOf(filter.getJerseyType().trim().toLowerCase(Locale.ROOT));
            } catch (IllegalArgumentException exception) {
                throw new InvalidRequestException("Invalid jersey type", exception);
            }
        }
    }
}
