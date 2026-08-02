import axios from 'axios';
import {BACKEND_USER_URL} from '../util/constants.ts';
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
    const response = await axios.post<ApiResponse<Order>>(API_URL, request, {withCredentials: true});
    return unwrap(response.data);
};

export const getOrders = async (): Promise<Order[]> => {
    const response = await axios.get<ApiResponse<Order[]>>(API_URL, {withCredentials: true});
    return unwrap(response.data);
};

export const cancelOrder = async (orderUuid: string): Promise<Order> => {
    const response = await axios.patch<ApiResponse<Order>>(`${API_URL}/${orderUuid}/cancel`, null, {withCredentials: true});
    return unwrap(response.data);
};

export const reorder = async (orderUuid: string): Promise<Cart> => {
    const response = await axios.post<ApiResponse<Cart>>(`${API_URL}/${orderUuid}/reorder`, null, {withCredentials: true});
    return unwrap(response.data);
};
