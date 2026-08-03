import type {Cart} from "../types/cart.ts";
import {apiClient} from './apiClient.ts';
import {BACKEND_USER_URL} from "../util/constants.ts";
import type {ApiResponse} from "../types/generic/apiResponse.ts";

const API_URL = `${BACKEND_USER_URL}/cart`;

export const getCart = async (): Promise<Cart> => {
    const response = await apiClient.get<ApiResponse<Cart>>(API_URL);
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
    const response = await apiClient.post<ApiResponse<Cart>>(`${API_URL}/items/${productUuid}`, {quantity});
    return getCartFromResponse(response.data);
}

export const updateCartItem = async (productUuid: string, quantity: number): Promise<Cart> => {
    const response = await apiClient.patch<ApiResponse<Cart>>(`${API_URL}/items/${productUuid}`, {quantity});
    return getCartFromResponse(response.data);
}

export const deleteCartItem = async (productUuid: string): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(`${API_URL}/items/${productUuid}`);
    return getCartFromResponse(response.data);
}
