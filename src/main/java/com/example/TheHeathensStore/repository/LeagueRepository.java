package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    List<League> findByNameContainingIgnoreCase(String name);
    List<League> findByNationId(Long nationId);
}