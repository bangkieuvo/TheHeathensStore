package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {
    @NotBlank(message = "Username can't be blank")
    private String username;

    @NotBlank(message = "Password can't be blank")
    @Size(min = 8, max = 72, message = "Password must contain between 8 and 72 characters")
    private String password;

    @NotBlank(message = "Email can't be blank")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Name can't be blank")
    private String fullName;

    @Pattern(regexp = "^$|^[0-9+()\\-\\s]{8,20}$", message = "Phone format is invalid")
    private String phone;

    private String address;
}
