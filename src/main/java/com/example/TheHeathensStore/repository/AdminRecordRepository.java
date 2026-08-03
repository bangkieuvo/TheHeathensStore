package com.example.TheHeathensStore.repository;

import com.example.TheHeathensStore.entity.AdminRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AdminRecordRepository extends JpaRepository<AdminRecord, Long> {
    List<AdminRecord> findAllByOrderByUpdatedAtDesc();
    Optional<AdminRecord> findByUuid(UUID uuid);
}
