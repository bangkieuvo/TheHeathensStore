package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record AdminProductRequest(
        @NotBlank @Size(max = 255) String name,
        @NotNull @DecimalMin("0.00") BigDecimal price,
        @NotNull @PositiveOrZero Long stock,
        @Size(max = 10000) String description,
        @NotBlank String jerseyType,
        Long teamId,
        Long seasonId,
        boolean active
) {
}
