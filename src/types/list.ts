import type { IUser } from './user';

export interface IList {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    items: IListItem[];
    user: Omit<IUser, 'created_at' | 'updated_at'>;
    members: { user: Omit<IUser, 'created_at' | 'updated_at'> }[];
}

export interface IListItem {
    id: number;
    title: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}
