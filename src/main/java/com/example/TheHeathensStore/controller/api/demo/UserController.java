package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.UpdateCartQuantityRequest;
import com.example.TheHeathensStore.dto.response.CartItemResponse;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.dto.response.FavoriteItemResponse;
import com.example.TheHeathensStore.dto.response.FavoriteResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.security.UserPrincipal;
import com.example.TheHeathensStore.service.CartService;
import com.example.TheHeathensStore.service.FavoriteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/me")
public class UserController {
    private final CartService cartService;
    private final FavoriteService favoriteService;

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
    public ResponseEntity<ApiResponse<CartItemResponse>> addCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        CartItemResponse result = cartService.addToCart(userPrincipal.getUserId(), productUuid);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(ApiResponse.of(
                                     HttpStatus.CREATED.value(),
                                     "Cart item added successfully",
                                     true,
                                     result
                             ));
    }

    @PatchMapping("/cart/items/{productUuid}")
    public ResponseEntity<ApiResponse<CartItemResponse>> updateCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid,
            @Valid @RequestBody UpdateCartQuantityRequest request
    ) {
        CartItemResponse result = cartService.updateCartItem(
                userPrincipal.getUserId(),
                productUuid,
                request.quantity()
        );
        return ResponseEntity.ok(ApiResponse.success("Cart item updated successfully", result));
    }

    @DeleteMapping("/cart/items/{productUuid}")
    public ResponseEntity<Void> deleteCartItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        cartService.deleteFromCart(userPrincipal.getUserId(), productUuid);
        return ResponseEntity.noContent()
                             .build();
    }

    @PutMapping("/favorites/{productUuid}")
    public ResponseEntity<ApiResponse<FavoriteItemResponse>> addFavorite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        FavoriteItemResponse result = favoriteService.addToFavorite(userPrincipal.getUserId(), productUuid);
        return ResponseEntity.ok(ApiResponse.success("Favorite saved successfully", result));
    }

    @DeleteMapping("/favorites/{productUuid}")
    public ResponseEntity<Void> deleteFavorite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productUuid
    ) {
        favoriteService.deleteFromFavorite(userPrincipal.getUserId(), productUuid);
        return ResponseEntity.noContent()
                             .build();
    }
}
