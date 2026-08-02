package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(length = 20)
    private String phone;

    @Column(name = "address", nullable = false, length = 500)
    private String address;
}
