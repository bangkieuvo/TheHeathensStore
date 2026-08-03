package com.example.TheHeathensStore.entity;

import com.github.f4b6a3.uuid.UuidCreator;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Types;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "admin_records")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class AdminRecord {
    public enum RecordType { PROMOTION, BANNER, BLOG, EMAIL_TEMPLATE }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @JdbcTypeCode(Types.BINARY) @Column(columnDefinition = "BINARY(16)", nullable = false, unique = true) private UUID uuid;
    @Enumerated(EnumType.STRING) @Column(name = "record_type", nullable = false, length = 30) private RecordType recordType;
    @Column(name = "record_key", nullable = false, length = 120) private String recordKey;
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT") private String content;
    @Column(name = "record_value", length = 500) private String recordValue;
    @Builder.Default @Column(nullable = false) private boolean active = true;
    @Column(name = "starts_at") private LocalDateTime startsAt;
    @Column(name = "ends_at") private LocalDateTime endsAt;
    @CreationTimestamp @Column(name = "created_at", nullable = false, updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp @Column(name = "updated_at", nullable = false) private LocalDateTime updatedAt;
    @PrePersist void createUuid() { if (uuid == null) uuid = UuidCreator.getTimeOrderedEpoch(); }
}
