export interface LoginUser {
    username: string,
    password: string,
    rememberMe: boolean,
}
export const createLoginUser = (username: string, password: string, rememberMe = false): LoginUser => (
    {
        username,
        password,
        rememberMe,
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
    roles?: string[];
}

export const hasRole = (user: UserResponse | null, role: string): boolean => user?.roles?.includes(role) ?? false;
export const canManageStore = (user: UserResponse | null): boolean => hasRole(user, 'ADMIN') || hasRole(user, 'STAFF');
export const canManageStaff = (user: UserResponse | null): boolean => hasRole(user, 'ADMIN');
