import api from '../redux/rtk';
import { IUser, PaginationRequestParams, PaginationResponseData } from '../types';

interface GetUsersParams extends PaginationRequestParams {
    search?: string;
    exclude_ids?: number[];
}

type GetUsersResponse = PaginationResponseData<IUser>;

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<GetUsersResponse, GetUsersParams>({
            query: (params) => ({
                url: '/users',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'User' as const, id })), 'User'] : ['User']
        })
    })
});

export const { useLazyGetUsersQuery } = userApi;
