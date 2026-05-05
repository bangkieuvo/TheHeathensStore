package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.UserLoginRequest;
import com.example.TheHeathensStore.dto.request.UserRegisterRequest;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.dto.response.FavoriteResponse;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.service.CartService;
import com.example.TheHeathensStore.service.FavoriteService;
import com.example.TheHeathensStore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserControiler {
    private final UserService userService;
    private final CartService cartService;
    private final FavoriteService favoriteService;

    @GetMapping("/uuid/{uuid}")
    public UserResponse getUser(@PathVariable UUID uuid) {
        return this.userService.getByUuid(uuid);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRegisterRequest userRegisterRequest) {
        UserResponse userResponse = userService.register(userRegisterRequest);
        if (userResponse == null)
            return null;
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        UserResponse userResponse = userService.login(userLoginRequest);
        if (userResponse == null)
            return null;
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/cart/{uuid}")
    public CartResponse getCartByUserUUID(@PathVariable UUID uuid) {
        return cartService.getCartByUuid(uuid);
    }

    @GetMapping("/favorite/{uuid}")
    public FavoriteResponse getFavoriteByUserUUID(@PathVariable UUID uuid) {
        return favoriteService.getFavoriteByUuid(uuid);
    }
}
