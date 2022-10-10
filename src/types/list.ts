import type { User } from './user';

export interface List {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    items: ListItem[];
    user: Omit<User, 'created_at' | 'updated_at'>;
    members: Omit<User, 'created_at' | 'updated_at'>[];
}

export interface ListItem {
    id: number;
    title: string;
    amount: number;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}
