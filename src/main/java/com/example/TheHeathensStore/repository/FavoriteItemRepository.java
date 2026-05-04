package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.FavoriteItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoriteItemRepository extends JpaRepository<FavoriteItem, Long> {
    Optional<FavoriteItem> findByUserIdAndProductId(Long userId, Long productId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    @EntityGraph(attributePaths = {"product", "product.team", "product.season"})
    List<FavoriteItem> findByUserId(Long userId);


    @Transactional
    @Modifying
    @Query("DELETE FROM FavoriteItem f WHERE f.userId = :userId")
    void deleteAllByUserId(Long userId);

}
