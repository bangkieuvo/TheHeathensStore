import type {Cart} from "../types/cart.ts";
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

const getCartFromResponse = (wrapper: ApiResponse<Cart>): Cart => {
    if (!wrapper.success || !wrapper.data) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
};

export const addCartItem = async (productUuid: string, quantity = 1): Promise<Cart> => {
    const response = await axios.post<ApiResponse<Cart>>(`${API_URL}/items/${productUuid}`, {quantity}, {
        withCredentials: true,
    });
    return getCartFromResponse(response.data);
}

export const updateCartItem = async (productUuid: string, quantity: number): Promise<Cart> => {
    const response = await axios.patch<ApiResponse<Cart>>(`${API_URL}/items/${productUuid}`, {quantity}, {
        withCredentials: true,
    });
    return getCartFromResponse(response.data);
}

export const deleteCartItem = async (productUuid: string): Promise<Cart> => {
    const response = await axios.delete<ApiResponse<Cart>>(`${API_URL}/items/${productUuid}`, {
        withCredentials: true,
    });
    return getCartFromResponse(response.data);
}
