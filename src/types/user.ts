export enum UserRole {
    ADMIN,
    USER
}

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
