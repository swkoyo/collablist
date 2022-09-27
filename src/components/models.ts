export interface Todo {
    id: number;
    content: string;
}

export interface Meta {
    totalCount: number;
}

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: 'ADMIN' | 'USER';
    created_at: Date;
    updated_at: Date;
}
