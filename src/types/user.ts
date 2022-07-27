export interface UserDTO {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface UserValueDTO {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface Account {
    id: number;
}

export interface AccountValue {
    login: string;
    password: string;
}
