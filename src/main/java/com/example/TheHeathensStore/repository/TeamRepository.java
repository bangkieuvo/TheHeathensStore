package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team,Long> {
    List<Team> findByLeagueId(Long leagueId);
}
