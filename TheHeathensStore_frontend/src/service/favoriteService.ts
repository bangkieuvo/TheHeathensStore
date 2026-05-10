import axios from "axios";
import type {Favorite} from "../types/favorite.ts";
import {BACKEND_URL} from "../util/constanst.ts";
const API_URL = `${BACKEND_URL}/user/favorite`
export const getFavoriteByUserUuid = async (userUuid:string):Promise<Favorite> =>{
    const response = await axios.get<Favorite>(`${API_URL}/${userUuid}`);
    return response.data;
}