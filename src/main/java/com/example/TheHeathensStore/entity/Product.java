package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.annotations.UuidGenerator.*;

import java.math.BigDecimal;
import java.sql.Types;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
	public enum JerseyType {
		home,
		away,
		third,
		home_gk,
		away_gk,
		third_gk
	}
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

    @Column
    private boolean isActive;
	@PrePersist
	protected void onCreate() {
		if (this.uuid == null) {
			this.uuid = UUID.randomUUID();
		}
	}
}