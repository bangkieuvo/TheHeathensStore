package com.example.TheHeathensStore.controller.api.demo;

import com.example.TheHeathensStore.dto.request.CreateOrderRequest;
import com.example.TheHeathensStore.dto.response.OrderResponse;
import com.example.TheHeathensStore.dto.response.CartResponse;
import com.example.TheHeathensStore.dto.wrapper.ApiResponse;
import com.example.TheHeathensStore.security.UserPrincipal;
import com.example.TheHeathensStore.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API_URL}/me/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        OrderResponse result = orderService.createOrder(userPrincipal.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(ApiResponse.of(
                                     HttpStatus.CREATED.value(),
                                     "Order created successfully",
                                     true,
                                     result
                             ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrders(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getOrders(userPrincipal.getUserId())));
    }

    @GetMapping("/{orderUuid}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID orderUuid
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                orderService.getOrder(userPrincipal.getUserId(), orderUuid)
        ));
    }

    @PatchMapping("/{orderUuid}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID orderUuid
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Order cancelled successfully",
                orderService.cancelOrder(userPrincipal.getUserId(), orderUuid)
        ));
    }

    @PostMapping("/{orderUuid}/reorder")
    public ResponseEntity<ApiResponse<CartResponse>> reorder(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID orderUuid
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Order items added to cart successfully",
                orderService.reorder(userPrincipal.getUserId(), userPrincipal.getUuid(), orderUuid)
        ));
    }
}
