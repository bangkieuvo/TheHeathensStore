package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StoreSettingRequest(
        @NotBlank @Size(max = 100) String key,
        @NotBlank String value,
        @Size(max = 500) String description
) {
}
