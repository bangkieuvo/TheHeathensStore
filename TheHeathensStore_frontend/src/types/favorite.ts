import type {ProductMin} from "./product.ts";

export interface FavoriteItem{
    id: number;
    productInfo: ProductMin
}
export interface Favorite {
    userUuid: string;
    favoriteItems: FavoriteItem[];
}