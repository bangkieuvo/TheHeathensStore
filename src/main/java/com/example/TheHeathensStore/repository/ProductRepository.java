package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByUuid(UUID uuid);

    List<Product> findByTeamId(Long teamId);

    List<Product> findBySeasonId(Long seasonId);


    List<Product> findAllByIdIn(List<Long> ids);

    @EntityGraph(attributePaths = {"team", "team.league", "season"})
    List<Product> findByTeam_League_Id(Long teamLeagueId);

    Page<Product> findByIsActiveTrue(Pageable pageable);
}
