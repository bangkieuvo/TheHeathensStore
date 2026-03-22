package com.example.TheHeathensStore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id; // Đổi Long -> long

    @Column(name = "user_id", nullable = false)
    private long userId; // Đổi Long -> long

    @Column(name = "is_paid", nullable = false)
    private boolean isPaid; // Đổi Boolean -> boolean

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

    public boolean isPaid() { // Đổi getIsPaid() -> isPaid()
        return isPaid;
    }

    public void setPaid(boolean isPaid) { // Đổi setIsPaid() -> setPaid()
        this.isPaid = isPaid;
    }
}
