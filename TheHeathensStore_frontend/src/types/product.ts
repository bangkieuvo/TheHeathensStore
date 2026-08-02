export interface Product {
    uuid: string;
    name: string;
    price: number;
    stock: number;
    salesCount?: number;
    description: string;
    jerseyType: string;
    teamName: string;
    leagueName?: string | null;
    season: string;
    createdAt: string;
    updatedAt: string;
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
    createdAt: string;
    updatedAt: string;
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
        thumbnailUrl: string,
        createdAt: string = '',
        updatedAt: string = ''
    ): ProductMin => ({uuid, name, price, stock, jerseyType, teamName, season, createdAt, updatedAt, thumbnailUrl});
