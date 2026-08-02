package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @NotBlank(message = "Full name is required")
        @Size(max = 100, message = "Full name cannot exceed 100 characters")
        String fullName,

        @NotBlank(message = "Email is required")
        @Email(message = "Email format is invalid")
        @Size(max = 255, message = "Email cannot exceed 255 characters")
        String email,

        @Pattern(regexp = "^$|^[0-9+()\\-\\s]{8,20}$", message = "Phone format is invalid")
        String phone,

        @Size(max = 500, message = "Address cannot exceed 500 characters")
        String address
) {
}
