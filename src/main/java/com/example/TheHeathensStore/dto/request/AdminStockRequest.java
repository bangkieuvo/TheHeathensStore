package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record AdminStockRequest(@NotNull @PositiveOrZero Long stock) {
}
