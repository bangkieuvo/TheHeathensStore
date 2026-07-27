export interface LoginUser {
    username: string,
    password: string,
}
export const createLoginUser = (username: string, password: string): LoginUser => (
    {
        username,
        password
    }
);

export interface RegisterUser {
    username: string;
    password: string;
    email: string;
    fullName: string;
    address: string;
}

export const createRegisterUser = (
    username: string,
    password: string,
    email: string,
    fullName: string,
    address: string,
): RegisterUser => (
    {
        username,
        password,
        email,
        fullName,
        address,
    }
);

export interface UserResponse {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    address: string;
}
