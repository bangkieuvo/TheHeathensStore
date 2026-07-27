package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "staffs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_code", length = 20, nullable = false, unique = true)
    private String employeeCode;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;
}