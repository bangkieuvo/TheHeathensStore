package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.dto.request.UserRegisterRequest;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.service.AuthenticationService;
import com.example.TheHeathensStore.service.UserService;
import com.example.TheHeathensStore.repository.StoreSettingRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/public")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final StoreSettingRepository storeSettingRepository;

    @Value("${app.cookie.secure:false}")
    private boolean secureCookie;

    @Value("${app.cookie.same-site:Lax}")
    private String cookieSameSite;

    @GetMapping("/store-settings")
    public ResponseEntity<ApiResponse<Map<String, String>>> storeSettings() {
        Map<String, String> settings = new LinkedHashMap<>();
        storeSettingRepository.findAll().stream()
                .filter(setting -> setting.getSettingKey().startsWith("shipping.") || setting.getSettingKey().startsWith("store."))
                .forEach(setting -> settings.put(setting.getSettingKey(), setting.getSettingValue()));
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<Void>> login(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        String jwt = authenticationService.login(userLoginRequest);
        ResponseCookie loginCookie = ResponseCookie.from("loginToken", jwt)
                                                   .httpOnly(true)
                                                   .secure(secureCookie)
                                                   .sameSite(cookieSameSite)
                                                   .path("/")
                                                   .maxAge(userLoginRequest.isRememberMe() ? Duration.ofDays(30) : Duration.ofSeconds(-1))
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
                                                     .secure(secureCookie)
                                                     .sameSite(cookieSameSite)
                                                     .path("/")
                                                     .maxAge(Duration.ZERO)
                                                     .build();
        return ResponseEntity.noContent()
                             .header(HttpHeaders.SET_COOKIE, expiredCookie.toString())
                             .build();
    }
}
