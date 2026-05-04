package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
