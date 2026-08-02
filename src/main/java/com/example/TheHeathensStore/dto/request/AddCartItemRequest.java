package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record AddCartItemRequest(
        @Min(value = 1, message = "Quantity must be at least 1")
        @Max(value = 1000, message = "Quantity cannot exceed 1000")
        Long quantity
) {
}
