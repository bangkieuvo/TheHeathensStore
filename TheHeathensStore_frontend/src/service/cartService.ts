import type {Cart} from "../types/cart.ts";
import axios from "axios";
const API_URL = 'http://localhost:8080/user/cart';
export const getCartByUserUuid = async (userUuid:string):Promise<Cart> =>{

    // Axios tự động parse JSON và cực kỳ an toàn với TypeScript
        const response = await axios.get<Cart>(`${API_URL}/${userUuid}`);
        return response.data;
}
