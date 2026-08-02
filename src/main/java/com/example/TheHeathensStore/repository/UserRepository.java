package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUuid(UUID uuid);
    Optional<User> findByEmailIgnoreCase(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Long id);
    boolean existsByUsernameOrEmail(String username, String email);
}
