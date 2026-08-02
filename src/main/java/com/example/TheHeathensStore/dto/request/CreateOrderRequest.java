package com.example.TheHeathensStore.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import com.example.TheHeathensStore.entity.Order;

import java.util.List;

public record CreateOrderRequest(
        @NotEmpty(message = "Order must contain at least one item")
        @Size(max = 100, message = "Order cannot contain more than 100 items")
        List<@Valid CreateOrderItemRequest> items,

        @NotBlank(message = "Recipient name is required")
        @Size(max = 100, message = "Recipient name cannot exceed 100 characters")
        String recipientName,

        @NotBlank(message = "Recipient phone is required")
        @Pattern(
                regexp = "^[0-9+()\\-\\s]{8,20}$",
                message = "Recipient phone format is invalid"
        )
        String recipientPhone,

        @NotBlank(message = "Shipping address is required")
        @Size(max = 500, message = "Shipping address cannot exceed 500 characters")
        String shippingAddress,

        Order.ShippingMethod shippingMethod,

        Order.PaymentMethod paymentMethod
) {
    public CreateOrderRequest(
            List<CreateOrderItemRequest> items,
            String recipientName,
            String recipientPhone,
            String shippingAddress
    ) {
        this(items, recipientName, recipientPhone, shippingAddress, null, null);
    }
}
