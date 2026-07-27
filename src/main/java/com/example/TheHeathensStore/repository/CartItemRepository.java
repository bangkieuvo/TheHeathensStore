package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.CartItem;
import com.example.TheHeathensStore.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    @EntityGraph(attributePaths = {"product", "product.team", "product.season"})
    List<CartItem> findByUserId(Long userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.userId = :userId AND c.product.id = :productId")
    void deleteByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.userId = :userId")
    void deleteAllByUserId(Long userId);


}
