package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findByUuid(UUID uuid);

    @EntityGraph(attributePaths = {"team", "team.league", "season"})
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.uuid = :uuid")
    Optional<Product> findByUuidForUpdate(@Param("uuid") UUID uuid);

    List<Product> findByTeamId(Long teamId);

    List<Product> findBySeasonId(Long seasonId);

    List<Product> findAllByIdIn(List<Long> ids);

    @EntityGraph(attributePaths = {"team", "team.league", "season"})
    List<Product> findByTeam_League_Id(Long teamLeagueId);

    @EntityGraph(attributePaths = {"team", "team.league", "season"})
    Page<Product> findByIsActiveTrue(Pageable pageable);

    @EntityGraph(attributePaths = {"team", "team.league", "season"})
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.uuid = :uuid")
    Optional<Product> findActiveByUuid(@Param("uuid") UUID uuid);

    @EntityGraph(attributePaths = {"team", "team.league", "season"})
    List<Product> findTop4ByIsActiveTrueAndTeam_IdAndUuidNotOrderByCreatedAtDesc(Long teamId, UUID uuid);

}
