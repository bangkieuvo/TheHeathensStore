import axios from "axios";
import type {Favorite} from "../types/favorite.ts";
const API_URL = 'http://localhost:8080/user/favorite';
export const getFavoriteByUserUuid = async (userUuid:string):Promise<Favorite> =>{
    const response = await axios.get<Favorite>(`${API_URL}/${userUuid}`);
    return response.data;
}