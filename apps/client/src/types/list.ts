import type { IUser } from './user';

export interface IList {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    items: IListItem[];
    is_complete: boolean;
    user: IUser;
    members: { user: IUser }[];
}

export interface IListItem {
    id: number;
    title: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}
