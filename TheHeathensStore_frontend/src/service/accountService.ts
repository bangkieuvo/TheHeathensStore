import {apiClient} from './apiClient.ts';
import {BACKEND_USER_URL} from '../util/constants.ts';
import type {ApiResponse} from '../types/generic/apiResponse.ts';
import type {UserResponse} from '../types/user.ts';
import type {ShippingAddress, ShippingAddressRequest} from '../types/address.ts';

const unwrap = <T>(wrapper: ApiResponse<T>): T => {
    if (!wrapper.success || wrapper.data === undefined || wrapper.data === null) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
};

export const updateProfile = async (request: Pick<UserResponse, 'fullName' | 'email' | 'phone' | 'address'>) => {
    const response = await apiClient.patch<ApiResponse<UserResponse>>(`${BACKEND_USER_URL}/profile`, request);
    return unwrap(response.data);
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<null>>(`${BACKEND_USER_URL}/password`, {currentPassword, newPassword});
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
};

export const getShippingAddresses = async (): Promise<ShippingAddress[]> => {
    const response = await apiClient.get<ApiResponse<ShippingAddress[]>>(`${BACKEND_USER_URL}/shipping-addresses`);
    return unwrap(response.data);
};

export const createShippingAddress = async (request: ShippingAddressRequest): Promise<ShippingAddress> => {
    const response = await apiClient.post<ApiResponse<ShippingAddress>>(`${BACKEND_USER_URL}/shipping-addresses`, request);
    return unwrap(response.data);
};

export const updateShippingAddress = async (id: number, request: ShippingAddressRequest): Promise<ShippingAddress> => {
    const response = await apiClient.put<ApiResponse<ShippingAddress>>(`${BACKEND_USER_URL}/shipping-addresses/${id}`, request);
    return unwrap(response.data);
};

export const deleteShippingAddress = async (id: number): Promise<void> => {
    await apiClient.delete(`${BACKEND_USER_URL}/shipping-addresses/${id}`);
};
