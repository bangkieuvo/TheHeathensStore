package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.dto.request.UserRegisterRequest;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.service.AuthenticationService;
import com.example.TheHeathensStore.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/public")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<Void>> login(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        String jwt = authenticationService.login(userLoginRequest);
        ResponseCookie loginCookie = ResponseCookie.from("loginToken", jwt)
                                                   .httpOnly(true)
                                                   .secure(true)
                                                   .sameSite("lax")
                                                   .path("/")
                                                   .build();
        return ResponseEntity.status(HttpStatus.CREATED)
                             .header(HttpHeaders.SET_COOKIE, loginCookie.toString())
                             .body(ApiResponse.of(
                                             HttpStatus.CREATED.value(),
                                             "Session created successfully",
                                             true,
                                             null
                                     )
                             );
    }

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
        UserResponse userResponse = userService.register(userRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(ApiResponse.of(
                                             HttpStatus.CREATED.value(),
                                             "User registered successfully",
                                             true,
                                             userResponse
                                     )
                             );
    }

    @GetMapping("/sessions/current")
    public ResponseEntity<ApiResponse<UserResponse>> checkAuth(@CookieValue(required = false, name = "loginToken") String loginToken) {
        UserResponse userResponse = authenticationService.checkLogin(loginToken);
        if (userResponse == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(ApiResponse.of(HttpStatus.UNAUTHORIZED.value(), "Authentication failed", false, null));
        }
        return ResponseEntity.ok(ApiResponse.success("Authenticated", userResponse));
    }

    @DeleteMapping("/sessions/current")
    public ResponseEntity<Void> logout() {
        ResponseCookie expiredCookie = ResponseCookie.from("loginToken", "")
                                                     .httpOnly(true)
                                                     .secure(true)
                                                     .sameSite("lax")
                                                     .path("/")
                                                     .maxAge(Duration.ZERO)
                                                     .build();
        return ResponseEntity.noContent()
                             .header(HttpHeaders.SET_COOKIE, expiredCookie.toString())
                             .build();
    }
}
