package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Types;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JdbcTypeCode(Types.BINARY)
    @Column(columnDefinition = "BINARY(16)", nullable = false, unique = true)
    private UUID uuid;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    @Column(nullable = false)
    private Long stock;
    @Builder.Default
    @Column(name = "sales_count", nullable = false)
    private Long salesCount = 0L;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(name = "jersey_type", nullable = false)
    private JerseyType jerseyType;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "season_id")
    private Season season;
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @BatchSize(size = 20)
    private List<ProductImage> images = new ArrayList<>();
    @Column
    private boolean isActive;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID();
        }
    }

    public enum JerseyType {
        home, away, third, home_gk, away_gk, third_gk
    }
}
