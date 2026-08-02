package com.example.TheHeathensStore.mapper;

import com.example.TheHeathensStore.dto.response.OrderItemResponse;
import com.example.TheHeathensStore.dto.response.OrderResponse;
import com.example.TheHeathensStore.entity.Order;
import com.example.TheHeathensStore.entity.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderResponse entityToResponse(Order order) {
        return OrderResponse.builder()
                            .uuid(order.getUuid())
                            .orderStatus(order.getOrderStatus()
                                              .name())
                            .paymentStatus(order.getPaymentStatus()
                                                .name())
                            .shippingMethod(order.getShippingMethod().name())
                            .paymentMethod(order.getPaymentMethod().name())
                            .totalAmount(order.getTotalAmount())
                            .shippingFee(order.getShippingFee())
                            .recipientName(order.getRecipientName())
                            .recipientPhone(order.getRecipientPhone())
                            .shippingAddress(order.getShippingAddress())
                            .createdAt(order.getCreatedAt())
                            .updatedAt(order.getUpdatedAt())
                            .items(order.getItems()
                                        .stream()
                                        .map(this::itemToResponse)
                                        .toList())
                            .build();
    }

    private OrderItemResponse itemToResponse(OrderItem item) {
        return OrderItemResponse.builder()
                                .productUuid(item.getProductUuid())
                                .productName(item.getProductName())
                                .quantity(item.getQuantity())
                                .unitPrice(item.getUnitPrice())
                                .lineTotal(item.getLineTotal())
                                .build();
    }
}
