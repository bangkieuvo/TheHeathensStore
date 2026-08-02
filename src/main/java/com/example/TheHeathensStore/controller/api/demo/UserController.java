package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.UpdateCartQuantityRequest;
import com.example.TheHeathensStore.dto.request.AddCartItemRequest;
import com.example.TheHeathensStore.dto.request.ChangePasswordRequest;
import com.example.TheHeathensStore.dto.request.ShippingAddressRequest;
import com.example.TheHeathensStore.dto.request.UpdateProfileRequest;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.dto.response.FavoriteResponse;
import com.example.TheHeathensStore.dto.response.ShippingAddressResponse;
import com.example.TheHeathensStore.dto.response.UserResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.security.UserPrincipal;
import com.example.TheHeathensStore.service.CartService;
import com.example.TheHeathensStore.service.FavoriteService;
import com.example.TheHeathensStore.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/me")
public class UserController {
    private final CartService cartService;
    private final FavoriteService favoriteService;
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return ResponseEntity.ok(ApiResponse.success(userService.getById(userPrincipal.getUserId())));
    }

    @PatchMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Profile updated successfully",
                userService.updateProfile(userPrincipal.getUserId(), request)
        ));
    }

    @PatchMapping("/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        userService.changePassword(userPrincipal.getUserId(), request);
        return ResponseEntity.ok(ApiResponse.success("Password updated successfully", null));
    }

    @GetMapping("/shipping-addresses")
    public ResponseEntity<ApiResponse<List<ShippingAddressResponse>>> getShippingAddresses(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                userService.getShippingAddresses(userPrincipal.getUserId())
        ));
    }

    @PostMapping("/shipping-addresses")
    public ResponseEntity<ApiResponse<ShippingAddressResponse>> createShippingAddress(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ShippingAddressRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.of(
                HttpStatus.CREATED.value(),
                "Shipping address created successfully",
                true,
                userService.createShippingAddress(userPrincipal.getUserId(), request)
        ));
    }

    @PutMapping("/shipping-addresses/{addressId}")
    public ResponseEntity<ApiResponse<ShippingAddressResponse>> updateShippingAddress(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long addressId,
            @Valid @RequestBody ShippingAddressRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Shipping address updated successfully",
                userService.updateShippingAddress(userPrincipal.getUserId(), addressId, request)
        ));
    }

    @DeleteMapping("/shipping-addresses/{addressId}")
    public ResponseEntity<Void> deleteShippingAddress(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long addressId
    ) {
        userService.deleteShippingAddress(userPrincipal.getUserId(), addressId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cart")
    public ResponseEntity<ApiResponse<CartResponse>> getCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        CartResponse result = cartService.getCart(userPrincipal.getUserId(), userPrincipal.getUuid());
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/favorites")
    public ResponseEntity<ApiResponse<FavoriteResponse>> getFavorites(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        FavoriteResponse result = favoriteService.getFavorites(userPrincipal.getUserId(), userPrincipal.getUuid());
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @PostMapping("/cart/items/{productUuid}")
    public ResponseEntity<ApiResponse<CartResponse>> addCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid,
            @Valid @RequestBody(required = false) AddCartItemRequest request
    ) {
        CartResponse result = cartService.addToCart(
                userPrincipal.getUserId(),
                userPrincipal.getUuid(),
                productUuid,
                request == null || request.quantity() == null ? 1L : request.quantity()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(ApiResponse.of(
                                     HttpStatus.CREATED.value(),
                                     "Cart item added successfully",
                                     true,
                                     result
                             ));
    }

    @PatchMapping("/cart/items/{productUuid}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid,
            @Valid @RequestBody UpdateCartQuantityRequest request
    ) {
        CartResponse result = cartService.updateCartItem(
                userPrincipal.getUserId(),
                userPrincipal.getUuid(),
                productUuid,
                request.quantity()
        );
        return ResponseEntity.ok(ApiResponse.success("Cart item updated successfully", result));
    }

    @DeleteMapping("/cart/items/{productUuid}")
    public ResponseEntity<ApiResponse<CartResponse>> deleteCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        CartResponse result = cartService.deleteFromCart(
                userPrincipal.getUserId(),
                userPrincipal.getUuid(),
                productUuid
        );
        return ResponseEntity.ok(ApiResponse.success("Cart item deleted successfully", result));
    }

    @PutMapping("/favorites/{productUuid}")
    public ResponseEntity<ApiResponse<FavoriteResponse>> addFavorite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        FavoriteResponse result = favoriteService.addToFavorite(
                userPrincipal.getUserId(),
                userPrincipal.getUuid(),
                productUuid
        );
        return ResponseEntity.ok(ApiResponse.success("Favorite saved successfully", result));
    }

    @DeleteMapping("/favorites/{productUuid}")
    public ResponseEntity<ApiResponse<FavoriteResponse>> deleteFavorite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        FavoriteResponse result = favoriteService.deleteFromFavorite(
                userPrincipal.getUserId(),
                userPrincipal.getUuid(),
                productUuid
        );
        return ResponseEntity.ok(ApiResponse.success("Favorite deleted successfully", result));
    }
}
