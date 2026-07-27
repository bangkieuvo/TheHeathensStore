package com.example.TheHeathensStore.dto.request;

import jakarta.validation.constraints.NotBlank;
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
    private String password;

    @NotBlank(message = "Email can't be blank")
    private String email;

    @NotBlank(message = "Name can't be blank")
    private String fullName;

    private String address;
}
