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