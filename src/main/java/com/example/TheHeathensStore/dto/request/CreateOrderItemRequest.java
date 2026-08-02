package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record CreateOrderItemRequest(
        @NotNull(message = "Product UUID is required")
        UUID productUuid,

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be greater than 0")
        Long quantity
) {
}
