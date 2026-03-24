package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "nations")
public class Nation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name", nullable = false, unique = true, length = 255)
    private String name;

    @Column(name = "code", unique = true, length = 3)
    private String code;

    // Constructors
    public Nation() {}

    public Nation(String name, String code) {
        this.name = name;
        this.code = code;
    }

    // Getters & Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}