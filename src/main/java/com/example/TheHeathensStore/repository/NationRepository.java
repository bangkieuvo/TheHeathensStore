package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Nation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NationRepository extends JpaRepository<Nation,Long> {
    Optional<Nation> findByCode(String code);
    Optional<Nation> findByName(String name);
}
