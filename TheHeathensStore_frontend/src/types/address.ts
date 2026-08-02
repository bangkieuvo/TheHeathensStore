export interface ShippingAddress {
    id: number;
    recipientName: string;
    recipientPhone: string;
    address: string;
    isDefault: boolean;
}

export interface ShippingAddressRequest {
    recipientName: string;
    recipientPhone: string;
    address: string;
    isDefault: boolean;
}
