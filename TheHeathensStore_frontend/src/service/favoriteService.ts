import axios from "axios";
import type {Favorite} from "../types/favorite.ts";
import {BACKEND_USER_URL} from "../util/constants.ts";
import type {ApiResponse} from "../types/generic/apiResponse.ts";

const API_URL = `${BACKEND_USER_URL}/favorites`;

export const getFavorites = async (): Promise<Favorite> => {
    const response = await axios.get<ApiResponse<Favorite>>(API_URL, {
        withCredentials: true,
    });
    const wrapper: ApiResponse<Favorite> = response.data;
    if (!wrapper.success) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
}

const getFavoriteFromResponse = (wrapper: ApiResponse<Favorite>): Favorite => {
    if (!wrapper.success || !wrapper.data) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
};

export const addFavorite = async (productUuid: string): Promise<Favorite> => {
    const response = await axios.put<ApiResponse<Favorite>>(`${API_URL}/${productUuid}`, null, {
        withCredentials: true,
    });
    return getFavoriteFromResponse(response.data);
}

export const deleteFavorite = async (productUuid: string): Promise<Favorite> => {
    const response = await axios.delete<ApiResponse<Favorite>>(`${API_URL}/${productUuid}`, {
        withCredentials: true,
    });
    return getFavoriteFromResponse(response.data);
}
