package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.request.CreateOrderItemRequest;
import com.example.TheHeathensStore.dto.request.CreateOrderRequest;
import com.example.TheHeathensStore.dto.response.OrderResponse;
import com.example.TheHeathensStore.entity.Order;
import com.example.TheHeathensStore.entity.OrderItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.exception.InsufficientStockException;
import com.example.TheHeathensStore.exception.InvalidRequestException;
import com.example.TheHeathensStore.exception.ResourceNotFoundException;
import com.example.TheHeathensStore.mapper.OrderMapper;
import com.example.TheHeathensStore.repository.CartItemRepository;
import com.example.TheHeathensStore.repository.OrderRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    private static final BigDecimal FREE_STANDARD_SHIPPING_THRESHOLD = new BigDecimal("100.00");
    private static final BigDecimal STANDARD_SHIPPING_FEE = new BigDecimal("5.00");
    private static final BigDecimal EXPRESS_SHIPPING_FEE = new BigDecimal("15.00");

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderMapper orderMapper;
    private final CartService cartService;

    @Transactional
    public OrderResponse createOrder(Long userId, CreateOrderRequest request) {
        Map<UUID, Long> requestedQuantities = mergeRequestedQuantities(request.items());
        Order.ShippingMethod shippingMethod = request.shippingMethod() == null
                ? Order.ShippingMethod.STANDARD
                : request.shippingMethod();
        Order.PaymentMethod paymentMethod = request.paymentMethod() == null
                ? Order.PaymentMethod.COD
                : request.paymentMethod();
        Order order = Order.builder()
                           .userId(userId)
                           .orderStatus(Order.OrderStatus.PENDING)
                           .paymentStatus(Order.PaymentStatus.UNPAID)
                           .shippingMethod(shippingMethod)
                           .paymentMethod(paymentMethod)
                           .recipientName(request.recipientName()
                                                 .trim())
                           .recipientPhone(request.recipientPhone()
                                                  .trim())
                           .shippingAddress(request.shippingAddress()
                                                   .trim())
                           .build();

        BigDecimal itemsTotal = BigDecimal.ZERO;
        for (Map.Entry<UUID, Long> requestedItem : requestedQuantities.entrySet()) {
            Product product = productRepository.findByUuidForUpdate(requestedItem.getKey())
                                               .orElseThrow(() -> new ResourceNotFoundException(
                                                       "Product " + requestedItem.getKey() + " was not found"
                                               ));
            Long quantity = requestedItem.getValue();
            validatePurchasable(product, quantity);

            BigDecimal unitPrice = product.getPrice();
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(quantity));
            order.addItem(OrderItem.builder()
                                   .product(product)
                                   .productUuid(product.getUuid())
                                   .productName(product.getName())
                                   .quantity(quantity)
                                   .unitPrice(unitPrice)
                                   .lineTotal(lineTotal)
                                   .build());

            product.setStock(product.getStock() - quantity);
            product.setSalesCount(product.getSalesCount() + quantity);
            itemsTotal = itemsTotal.add(lineTotal);
            cartItemRepository.deleteByUserIdAndProductId(userId, product.getId());
        }

        order.setShippingFee(calculateShippingFee(itemsTotal, shippingMethod));
        order.setTotalAmount(itemsTotal.add(order.getShippingFee()));
        return orderMapper.entityToResponse(orderRepository.saveAndFlush(order));
    }

    public List<OrderResponse> getOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId)
                              .stream()
                              .map(orderMapper::entityToResponse)
                              .toList();
    }

    public OrderResponse getOrder(Long userId, UUID orderUuid) {
        return orderMapper.entityToResponse(findOrder(userId, orderUuid));
    }

    @Transactional
    public com.example.TheHeathensStore.dto.response.CartResponse reorder(
            Long userId,
            UUID userUuid,
            UUID orderUuid
    ) {
        Order order = findOrder(userId, orderUuid);
        Map<UUID, Long> quantities = new LinkedHashMap<>();
        order.getItems().forEach(item -> quantities.put(item.getProductUuid(), item.getQuantity()));
        return cartService.addItems(userId, userUuid, quantities);
    }

    @Transactional
    public OrderResponse cancelOrder(Long userId, UUID orderUuid) {
        Order order = findOrderForUpdate(userId, orderUuid);
        if (order.getOrderStatus() != Order.OrderStatus.PENDING
                && order.getOrderStatus() != Order.OrderStatus.CONFIRMED) {
            throw new InvalidRequestException("Order can no longer be cancelled");
        }
        if (order.getPaymentStatus() == Order.PaymentStatus.PAID
                || order.getPaymentStatus() == Order.PaymentStatus.REFUNDED) {
            throw new InvalidRequestException("Paid orders must be handled through the refund process");
        }

        for (OrderItem item : order.getItems()) {
            productRepository.findByUuidForUpdate(item.getProductUuid())
                             .ifPresent(product -> {
                                 product.setStock(product.getStock() + item.getQuantity());
                                 product.setSalesCount(Math.max(0L, product.getSalesCount() - item.getQuantity()));
                             });
        }
        order.setOrderStatus(Order.OrderStatus.CANCELLED);
        return orderMapper.entityToResponse(orderRepository.saveAndFlush(order));
    }

    private Map<UUID, Long> mergeRequestedQuantities(List<CreateOrderItemRequest> items) {
        Map<UUID, Long> quantities = new LinkedHashMap<>();
        for (CreateOrderItemRequest item : items) {
            if (item.productUuid() == null || item.quantity() == null || item.quantity() <= 0) {
                throw new InvalidRequestException("Order item is invalid");
            }
            try {
                quantities.merge(item.productUuid(), item.quantity(), Math::addExact);
            } catch (ArithmeticException ex) {
                throw new InvalidRequestException("Order item quantity is too large", ex);
            }
        }
        return quantities;
    }

    private void validatePurchasable(Product product, Long quantity) {
        if (!product.isActive()) {
            throw new InvalidRequestException("Product " + product.getUuid() + " is not available");
        }
        if (product.getStock() < quantity) {
            throw new InsufficientStockException(
                    "Insufficient stock for product " + product.getUuid()
            );
        }
    }

    private BigDecimal calculateShippingFee(BigDecimal itemsTotal, Order.ShippingMethod shippingMethod) {
        if (shippingMethod == Order.ShippingMethod.EXPRESS) {
            return EXPRESS_SHIPPING_FEE;
        }
        return itemsTotal.compareTo(FREE_STANDARD_SHIPPING_THRESHOLD) >= 0
                ? BigDecimal.ZERO
                : STANDARD_SHIPPING_FEE;
    }

    private Order findOrder(Long userId, UUID orderUuid) {
        if (orderUuid == null) {
            throw new InvalidRequestException("Order UUID is invalid");
        }
        return orderRepository.findByUuidAndUserId(orderUuid, userId)
                              .orElseThrow(() -> new ResourceNotFoundException(
                                      "Order " + orderUuid + " was not found"
                              ));
    }

    private Order findOrderForUpdate(Long userId, UUID orderUuid) {
        if (orderUuid == null) {
            throw new InvalidRequestException("Order UUID is invalid");
        }
        return orderRepository.findByUuidAndUserIdForUpdate(orderUuid, userId)
                              .orElseThrow(() -> new ResourceNotFoundException(
                                      "Order " + orderUuid + " was not found"
                              ));
    }
}
