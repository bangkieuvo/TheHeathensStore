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
    phone: string;
    address: string;
}

export const createRegisterUser = (
    username: string,
    password: string,
    email: string,
    fullName: string,
    phone: string,
    address: string,
): RegisterUser => (
    {
        username,
        password,
        email,
        fullName,
        phone,
        address,
    }
);

export interface UserResponse {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
}
