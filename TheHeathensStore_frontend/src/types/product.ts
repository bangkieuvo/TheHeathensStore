export interface Product {
    uuid: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    jerseyType: string;
    teamName: string;
    season: string;
    thumbnail: {
        id: number
        url: string;
        isThumbnail: boolean;
    } | null,
    images: {
        id: number;
        url: string;
        isThumbnail: boolean;
    }[];
}

export interface ProductMin {
    uuid: string;
    name: string;
    price: number;
    stock: number;
    jerseyType: string;
    teamName: string;
    season: string;
    thumbnailUrl: string;
};
export const createProductMin =
    (
        uuid: string,
        name: string,
        price: number,
        stock: number,
        jerseyType: string,
        teamName: string,
        season: string,
        thumbnailUrl: string
    ): ProductMin => ({uuid, name, price, stock, jerseyType, teamName, season, thumbnailUrl});
