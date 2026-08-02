package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ShippingAddressRequest(
        @NotBlank(message = "Recipient name is required")
        @Size(max = 100, message = "Recipient name cannot exceed 100 characters")
        String recipientName,

        @NotBlank(message = "Recipient phone is required")
        @Pattern(regexp = "^[0-9+()\\-\\s]{8,20}$", message = "Recipient phone format is invalid")
        String recipientPhone,

        @NotBlank(message = "Address is required")
        @Size(max = 500, message = "Address cannot exceed 500 characters")
        String address,

        boolean isDefault
) {
}
