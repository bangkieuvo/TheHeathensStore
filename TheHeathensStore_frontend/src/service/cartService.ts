import type {Cart} from "../types/cart.ts";
import axios from "axios";
import {BACKEND_URL} from "../util/constanst.ts";
const API_URL = `${BACKEND_URL}/user/cart`
export const getCartByUserUuid = async (userUuid:string):Promise<Cart> =>{
        const response = await axios.get<Cart>(`${API_URL}/${userUuid}`);
        return response.data;
}
