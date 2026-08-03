package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record AdminStaffRequest(
        @NotNull UUID userUuid,
        @NotBlank @Size(max = 20) String employeeCode
) {
}
