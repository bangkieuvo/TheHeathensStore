import {BACKEND_PUBLIC_URL} from "../util/constants.ts";
import axios from "axios";
import type {ApiResponse} from "../types/generic/apiResponse.ts";
import type {LoginUser, RegisterUser, UserResponse} from "../types/user.ts";

const API_URL = BACKEND_PUBLIC_URL;

export const login = async (credentials: LoginUser): Promise<void> => {
    const response = await axios.post<ApiResponse<void>>(`${API_URL}/sessions`, credentials, {
        withCredentials: true,
    });
    const wrapper = response.data;
    if (!wrapper.success) {
        throw new Error(wrapper.message);
    }
}

export const register = async (registration: RegisterUser): Promise<UserResponse> => {
    const response = await axios.post<ApiResponse<UserResponse>>(`${API_URL}/users`, registration);
    const wrapper = response.data;
    if (!wrapper.success || !wrapper.data) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
}

export const checkLogin = async (): Promise<UserResponse> => {
    const response = await axios.get<ApiResponse<UserResponse>>(`${API_URL}/sessions/current`, {
        withCredentials: true,
    });
    const wrapper = response.data;
    if (!wrapper.success) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
}

export const logout = async (): Promise<void> => {
    await axios.delete(`${API_URL}/sessions/current`, {
        withCredentials: true,
    });
}
