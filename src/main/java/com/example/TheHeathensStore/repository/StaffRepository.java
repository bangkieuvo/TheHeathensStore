package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUserId(Long userId);
    boolean existsByUserId(Long userId);
    boolean existsByEmployeeCodeIgnoreCase(String employeeCode);
}
