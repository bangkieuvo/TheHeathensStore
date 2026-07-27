package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "nations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Nation {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, unique = true, length = 255)
    private String name;

    @Column(name = "code", unique = true, length = 3)
    private String code;
}