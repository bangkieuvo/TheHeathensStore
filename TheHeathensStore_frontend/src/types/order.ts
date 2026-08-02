export type ShippingMethod = 'STANDARD' | 'EXPRESS';

export interface OrderItem {
    productUuid: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

export interface Order {
    uuid: string;
    orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    paymentStatus: 'UNPAID' | 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
    shippingMethod: ShippingMethod;
    paymentMethod: 'COD';
    totalAmount: number;
    shippingFee: number;
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
}

export interface CreateOrderRequest {
    items: {productUuid: string; quantity: number}[];
    recipientName: string;
    recipientPhone: string;
    shippingAddress: string;
    shippingMethod: ShippingMethod;
    paymentMethod: 'COD';
}
