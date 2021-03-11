export interface IUser {
    id: number;
    name: string;
    password: number;
    email: string;
    isauthenticated: boolean;
}

export interface IUserAuthentication {
    id: number;
    isauthenticated: boolean;
}
