package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public record AdminRecordRequest(
        @NotBlank String type,
        @NotBlank @Size(max = 120) String key,
        @NotBlank @Size(max = 255) String title,
        String content,
        @Size(max = 500) String value,
        boolean active,
        LocalDateTime startsAt,
        LocalDateTime endsAt
) {}
