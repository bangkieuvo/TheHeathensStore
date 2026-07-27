import type {ProductMin} from "./product.ts";

export interface CartItem {
    id: number;
    productInfo: ProductMin
    quantity: number;
    subTotal: number;
}
export interface Cart{
    userUuid: string;
    cartItems: CartItem[];
    cartTotal: number;
}

