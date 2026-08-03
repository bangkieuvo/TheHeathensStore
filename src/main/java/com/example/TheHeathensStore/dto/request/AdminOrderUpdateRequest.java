package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.Size;

public record AdminOrderUpdateRequest(
        String orderStatus,
        String paymentStatus,
        @Size(max = 1000) String internalNote
) {
}
