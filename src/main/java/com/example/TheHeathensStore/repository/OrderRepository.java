package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = {"items"})
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    @EntityGraph(attributePaths = {"items"})
    Optional<Order> findByUuidAndUserId(UUID uuid, Long userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @EntityGraph(attributePaths = {"items"})
    @Query("SELECT o FROM Order o WHERE o.uuid = :uuid AND o.userId = :userId")
    Optional<Order> findByUuidAndUserIdForUpdate(
            @Param("uuid") UUID uuid,
            @Param("userId") Long userId
    );
}
