package com.example.TheHeathensStore.service;

import com.example.TheHeathensStore.dto.request.CreateOrderItemRequest;
import com.example.TheHeathensStore.dto.request.CreateOrderRequest;
import com.example.TheHeathensStore.dto.response.OrderResponse;
import com.example.TheHeathensStore.entity.Order;
import com.example.TheHeathensStore.entity.OrderItem;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.exception.InsufficientStockException;
import com.example.TheHeathensStore.mapper.OrderMapper;
import com.example.TheHeathensStore.repository.CartItemRepository;
import com.example.TheHeathensStore.repository.OrderRepository;
import com.example.TheHeathensStore.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private OrderMapper orderMapper;

    @Mock
    private CartService cartService;

    @Test
    void shouldCreateOrderWithProductSnapshotAndServerCalculatedTotals() {
        UUID productUuid = UUID.randomUUID();
        Product product = product(10L, productUuid, "Manchester United Home 25-26", "105.00", 10L);
        CreateOrderRequest request = request(productUuid, 2L);
        OrderResponse expectedResponse = new OrderResponse();

        when(productRepository.findByUuidForUpdate(productUuid)).thenReturn(Optional.of(product));
        when(orderRepository.saveAndFlush(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(orderMapper.entityToResponse(any(Order.class))).thenReturn(expectedResponse);

        OrderService service = service();
        OrderResponse result = service.createOrder(4L, request);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository).saveAndFlush(orderCaptor.capture());
        Order savedOrder = orderCaptor.getValue();
        OrderItem savedItem = savedOrder.getItems()
                                        .get(0);

        assertSame(expectedResponse, result);
        assertEquals(Order.OrderStatus.PENDING, savedOrder.getOrderStatus());
        assertEquals(Order.PaymentStatus.UNPAID, savedOrder.getPaymentStatus());
        assertEquals(new BigDecimal("210.00"), savedOrder.getTotalAmount());
        assertEquals(BigDecimal.ZERO, savedOrder.getShippingFee());
        assertEquals("Nguyen Van A", savedOrder.getRecipientName());
        assertEquals(productUuid, savedItem.getProductUuid());
        assertEquals("Manchester United Home 25-26", savedItem.getProductName());
        assertEquals(2L, savedItem.getQuantity());
        assertEquals(new BigDecimal("105.00"), savedItem.getUnitPrice());
        assertEquals(new BigDecimal("210.00"), savedItem.getLineTotal());
        assertSame(savedOrder, savedItem.getOrder());
        assertEquals(8L, product.getStock());
        assertEquals(2L, product.getSalesCount());
        verify(cartItemRepository).deleteByUserIdAndProductId(4L, 10L);
    }

    @Test
    void shouldMergeDuplicateProductsBeforeCheckingStock() {
        UUID productUuid = UUID.randomUUID();
        Product product = product(10L, productUuid, "Arsenal Home 25-26", "100.00", 5L);
        CreateOrderRequest request = new CreateOrderRequest(
                List.of(
                        new CreateOrderItemRequest(productUuid, 1L),
                        new CreateOrderItemRequest(productUuid, 2L)
                ),
                "Recipient",
                "0123456789",
                "Address"
        );

        when(productRepository.findByUuidForUpdate(productUuid)).thenReturn(Optional.of(product));
        when(orderRepository.saveAndFlush(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service().createOrder(4L, request);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository).saveAndFlush(orderCaptor.capture());
        assertEquals(1, orderCaptor.getValue()
                                     .getItems()
                                     .size());
        assertEquals(3L, orderCaptor.getValue()
                                      .getItems()
                                      .get(0)
                                      .getQuantity());
        assertEquals(2L, product.getStock());
    }

    @Test
    void shouldRejectOrderWhenStockIsInsufficient() {
        UUID productUuid = UUID.randomUUID();
        Product product = product(10L, productUuid, "Product", "100.00", 1L);
        when(productRepository.findByUuidForUpdate(productUuid)).thenReturn(Optional.of(product));

        assertThrows(
                InsufficientStockException.class,
                () -> service().createOrder(4L, request(productUuid, 2L))
        );

        assertEquals(1L, product.getStock());
        verify(orderRepository, never()).saveAndFlush(any(Order.class));
        verify(cartItemRepository, never()).deleteByUserIdAndProductId(any(), any());
    }

    @Test
    void shouldLockOrderAndRestoreStockWhenCancelling() {
        UUID orderUuid = UUID.randomUUID();
        UUID productUuid = UUID.randomUUID();
        Product product = product(10L, productUuid, "Product", "100.00", 3L);
        product.setSalesCount(2L);
        Order order = Order.builder()
                           .uuid(orderUuid)
                           .userId(4L)
                           .orderStatus(Order.OrderStatus.PENDING)
                           .paymentStatus(Order.PaymentStatus.UNPAID)
                           .build();
        order.addItem(OrderItem.builder()
                               .product(product)
                               .productUuid(productUuid)
                               .productName(product.getName())
                               .quantity(2L)
                               .unitPrice(product.getPrice())
                               .lineTotal(new BigDecimal("200.00"))
                               .build());
        OrderResponse expectedResponse = new OrderResponse();

        when(orderRepository.findByUuidAndUserIdForUpdate(orderUuid, 4L)).thenReturn(Optional.of(order));
        when(productRepository.findByUuidForUpdate(productUuid)).thenReturn(Optional.of(product));
        when(orderRepository.saveAndFlush(order)).thenReturn(order);
        when(orderMapper.entityToResponse(order)).thenReturn(expectedResponse);

        OrderResponse result = service().cancelOrder(4L, orderUuid);

        assertSame(expectedResponse, result);
        assertEquals(Order.OrderStatus.CANCELLED, order.getOrderStatus());
        assertEquals(5L, product.getStock());
        assertEquals(0L, product.getSalesCount());
        verify(orderRepository).findByUuidAndUserIdForUpdate(orderUuid, 4L);
    }

    private OrderService service() {
        return new OrderService(orderRepository, productRepository, cartItemRepository, orderMapper, cartService);
    }

    private CreateOrderRequest request(UUID productUuid, Long quantity) {
        return new CreateOrderRequest(
                List.of(new CreateOrderItemRequest(productUuid, quantity)),
                "  Nguyen Van A  ",
                " 0123456789 ",
                " 123 Main Street "
        );
    }

    private Product product(Long id, UUID uuid, String name, String price, Long stock) {
        return Product.builder()
                      .id(id)
                      .uuid(uuid)
                      .name(name)
                      .price(new BigDecimal(price))
                      .stock(stock)
                      .isActive(true)
                      .build();
    }
}
