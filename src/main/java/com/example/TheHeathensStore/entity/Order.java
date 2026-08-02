package com.example.TheHeathensStore.entity;

import com.github.f4b6a3.uuid.UuidCreator;
import jakarta.persistence.*;
import lombok.*;
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
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        PROCESSING,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }

    public enum PaymentStatus {
        UNPAID,
        PENDING,
        PAID,
        FAILED,
        REFUNDED
    }

    public enum ShippingMethod {
        STANDARD,
        EXPRESS
    }

    public enum PaymentMethod {
        COD
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JdbcTypeCode(Types.BINARY)
    @Column(columnDefinition = "BINARY(16)", nullable = false, unique = true, updatable = false)
    private UUID uuid;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus = OrderStatus.PENDING;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "shipping_method", nullable = false)
    private ShippingMethod shippingMethod = ShippingMethod.STANDARD;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod = PaymentMethod.COD;

    @Builder.Default
    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "shipping_fee", nullable = false, precision = 12, scale = 2)
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(name = "recipient_name", nullable = false, length = 100)
    private String recipientName;

    @Column(name = "recipient_phone", nullable = false, length = 20)
    private String recipientPhone;

    @Column(name = "shipping_address", nullable = false, length = 500)
    private String shippingAddress;

    @Builder.Default
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<OrderItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    @PrePersist
    protected void onCreate() {
        if (uuid == null) {
            uuid = UuidCreator.getTimeOrderedEpoch();
        }
    }
}
