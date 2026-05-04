package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProductId(Long productId);

    List<ProductImage> findByProductIdAndIsThumbnailFalse(Long productId);

    Optional<ProductImage> findByProductIdAndIsThumbnailTrue(Long productId);

    List<ProductImage> findAllByProductIdInAndIsThumbnailTrue(List<Long> productIds);
}
