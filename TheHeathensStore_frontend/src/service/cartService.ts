import type {Cart} from "../types/cart.ts";
import axios from "axios";
const API_URL = 'http://localhost:8080/user/cart';
export const getCartByUserUuid = async (userUuid:string):Promise<Cart> =>{
        const response = await axios.get<Cart>(`${API_URL}/${userUuid}`);
        return response.data;
}
