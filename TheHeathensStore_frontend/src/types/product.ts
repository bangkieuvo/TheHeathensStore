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