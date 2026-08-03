import {apiClient} from './apiClient.ts';
import {BACKEND_PUBLIC_URL, BACKEND_USER_URL} from '../util/constants.ts';
import type {ApiResponse} from '../types/generic/apiResponse.ts';
import type {Cart} from '../types/cart.ts';
import type {CreateOrderRequest, Order} from '../types/order.ts';

const API_URL = `${BACKEND_USER_URL}/orders`;

const unwrap = <T>(wrapper: ApiResponse<T>): T => {
    if (!wrapper.success || wrapper.data === undefined || wrapper.data === null) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
};

export const createOrder = async (request: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>(API_URL, request);
    return unwrap(response.data);
};

export const getOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get<ApiResponse<Order[]>>(API_URL);
    return unwrap(response.data);
};

export const cancelOrder = async (orderUuid: string): Promise<Order> => {
    const response = await apiClient.patch<ApiResponse<Order>>(`${API_URL}/${orderUuid}/cancel`, null);
    return unwrap(response.data);
};

export const reorder = async (orderUuid: string): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(`${API_URL}/${orderUuid}/reorder`, null);
    return unwrap(response.data);
};

export const getStoreSettings = async (): Promise<Record<string, string>> => {
    const response = await apiClient.get<ApiResponse<Record<string, string>>>(`${BACKEND_PUBLIC_URL}/store-settings`);
    return unwrap(response.data);
};
