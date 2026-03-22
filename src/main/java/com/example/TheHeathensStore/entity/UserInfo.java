package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_info")
public class UserInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "user_id", nullable = false)
	private long userId;

	@Column(name = "full_name", nullable = false, length = 100)
	private String fullName;

	@Column(name = "address", nullable = false, length = 255)
	private String address;

	// Constructors
	public UserInfo() {
	}

	public UserInfo(long userId, String fullName, String address) {
		this.userId = userId;
		this.fullName = fullName;
		this.address = address;
	}

	// Getters & Setters
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
