import { Optional } from 'utility-types';
import { setCredentials } from '../features/auth/authSlice';
import api from '../redux/rtk';
import { IUser, PaginationRequestParams, PaginationResponseData } from '../types';

interface GetUsersParams extends PaginationRequestParams {
    search?: string;
    exclude_ids?: number[];
}

type GetUsersResponse = PaginationResponseData<IUser>;

type PutUserBody = Optional<
    Pick<IUser, 'id' | 'username' | 'avatar_url' | 'first_name' | 'last_name'>,
    'username' | 'avatar_url' | 'first_name' | 'last_name'
>;

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<GetUsersResponse, GetUsersParams>({
            query: (params) => ({
                url: '/users',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'User' as const, id })), 'User'] : ['User']
        }),
        putUser: builder.mutation<IUser, PutUserBody>({
            query: ({ id, ...body }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ user: data }));
                } catch {
                    //
                }
            }
        })
    })
});

export const { useLazyGetUsersQuery, usePutUserMutation } = userApi;
