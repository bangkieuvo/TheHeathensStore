import type {Cart, CartItem} from "../types/cart.ts";
import axios from "axios";
import {BACKEND_USER_URL} from "../util/constants.ts";
import type {ApiResponse} from "../types/generic/apiResponse.ts";

const API_URL = `${BACKEND_USER_URL}/cart`;

export const getCart = async (): Promise<Cart> => {
    const response = await axios.get<ApiResponse<Cart>>(API_URL, {
        withCredentials: true,
    });
    const wrapper: ApiResponse<Cart> = response.data;
    if(!wrapper.success){
        throw new Error(wrapper.message);
    }
    return wrapper.data;
}

export const addCartItem = async (productUuid: string): Promise<CartItem> => {
    const response = await axios.post<ApiResponse<CartItem>>(`${API_URL}/items/${productUuid}`, null, {
        withCredentials: true,
    });
    return response.data.data;
}

export const updateCartItem = async (productUuid: string, quantity: number): Promise<CartItem> => {
    const response = await axios.patch<ApiResponse<CartItem>>(`${API_URL}/items/${productUuid}`, {quantity}, {
        withCredentials: true,
    });
    return response.data.data;
}

export const deleteCartItem = async (productUuid: string): Promise<void> => {
    await axios.delete(`${API_URL}/items/${productUuid}`, {
        withCredentials: true,
    });
}
