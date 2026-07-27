import type {Product} from "../types/product.ts";
import axios from "axios";
import type {ApiResponse} from "../types/generic/apiResponse.ts";
import {BACKEND_PRODUCT_URL} from "../util/constants.ts";

const API_URL = BACKEND_PRODUCT_URL;
export const getFeatureProduct = async (): Promise<Product[]> => {
    const response = await axios.get<ApiResponse<Product[]>>(`${API_URL}/featured`);
    const wrapper = response.data;
    return wrapper.data;
}
