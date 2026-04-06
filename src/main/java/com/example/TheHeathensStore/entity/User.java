package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;

	@Column(name = "username", nullable = false, unique = true)
	private String username;

	@Column(name = "password_hash", nullable = false)
	private String hashedPassword;

	@Column(name = "email", unique = true)
	private String email;
}