package com.example.TheHeathensStore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
    private UUID userUuid;
    private List<CartItemResponse> cartItems;
    private BigDecimal cartTotal;
}