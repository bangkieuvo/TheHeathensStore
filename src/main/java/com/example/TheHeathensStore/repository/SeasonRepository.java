package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeasonRepository extends JpaRepository<Season,Long> {
    List<Season> findByName(String name);
}
