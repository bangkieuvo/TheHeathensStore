import {BACKEND_PRODUCT_URL} from "../util/constants.ts";
import type {Product} from "../types/product.ts";
import type {Page} from "../types/generic/page.ts";
import axios from "axios";
import type {ApiResponse} from "../types/generic/apiResponse.ts";

const API_URL = BACKEND_PRODUCT_URL;
export const getShopProducts = async (pageNumber: number): Promise<Page<Product>> => {
    if (pageNumber < 1) {
        throw new Error('Page number must be >= 1');
    }
    const response = await axios.get<ApiResponse<Page<Product>>>(`${API_URL}?page=${pageNumber - 1}`);
    const wrapper = response.data;
    if (!wrapper.success) {
        throw new Error(wrapper.message);
    }
    return wrapper.data;
}
