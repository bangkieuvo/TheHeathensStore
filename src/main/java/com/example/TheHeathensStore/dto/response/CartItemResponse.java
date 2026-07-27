package com.example.TheHeathensStore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
    private Long id;
    private ProductResponseMin productInfo;
    private Long quantity;
    private BigDecimal subTotal =  BigDecimal.ZERO;
}
