export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
