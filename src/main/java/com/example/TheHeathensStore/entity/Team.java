package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "teams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    public enum TeamType {
        club,
        national,
        special,
        custom
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING) // Quan trọng: Lưu chữ 'club' thay vì số 0 vào DB
    @Column(name = "team_type", nullable = false)
    private TeamType teamType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;
}