package com.example.TheHeathensStore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private UUID uuid;
    private String orderStatus;
    private String paymentStatus;
    private String shippingMethod;
    private String paymentMethod;
    private BigDecimal totalAmount;
    private BigDecimal shippingFee;
    private String recipientName;
    private String recipientPhone;
    private String shippingAddress;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<OrderItemResponse> items;
}
