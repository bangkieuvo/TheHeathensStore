import {BACKEND_PRODUCT_URL} from "../util/constants.ts";
import type {Product} from "../types/product.ts";
import type {Page} from "../types/generic/page.ts";
import {apiClient} from './apiClient.ts';
import type {ApiResponse} from "../types/generic/apiResponse.ts";

const API_URL = BACKEND_PRODUCT_URL;
export interface ShopProductQuery {
    page?: number;
    size?: number;
    keyword?: string;
    teamName?: string;
    leagueName?: string;
    seasonName?: string;
    jerseyType?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'newest' | 'best_selling' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}

const unwrap = <T>(wrapper: ApiResponse<T>): T => {
    if (!wrapper.success || wrapper.data === undefined || wrapper.data === null) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
};

export const getShopProducts = async (query: number | ShopProductQuery = 1): Promise<Page<Product>> => {
    const options: ShopProductQuery = typeof query === 'number' ? {page: query} : query;
    const pageNumber = options.page ?? 1;
    if (pageNumber < 1) {
        throw new Error('Page number must be >= 1');
    }
    const params = new URLSearchParams({page: String(pageNumber)});
    Object.entries(options).forEach(([key, value]) => {
        if (key !== 'page' && value !== undefined && value !== null && String(value).trim() !== '') {
            params.set(key, String(value));
        }
    });
    const response = await apiClient.get<ApiResponse<Page<Product>>>(`${API_URL}?${params.toString()}`);
    return unwrap(response.data);
}

export const getProduct = async (uuid: string): Promise<Product> => {
    const response = await apiClient.get<ApiResponse<Product>>(`${API_URL}/${uuid}`);
    return unwrap(response.data);
};

export const getRelatedProducts = async (uuid: string): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>(`${API_URL}/${uuid}/related`);
    return unwrap(response.data);
};

export const getProductSuggestions = async (keyword: string, limit = 5): Promise<Product[]> => {
    if (!keyword.trim()) {
        return [];
    }
    const params = new URLSearchParams({keyword: keyword.trim(), limit: String(limit)});
    const response = await apiClient.get<ApiResponse<Product[]>>(`${API_URL}/suggestions?${params.toString()}`);
    return unwrap(response.data);
}
