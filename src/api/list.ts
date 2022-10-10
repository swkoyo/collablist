import api from '../redux/rtk';
import { List, PaginationRequestParams, PaginationResponseData } from '../types';

type GetListsParams = PaginationRequestParams;

type GetListsResponse = PaginationResponseData<List>;

type PostListBody = Pick<List, 'title' | 'description'>;

type PostListResponse = List;

export const listsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query<GetListsResponse, GetListsParams>({
            query: (params) => ({
                url: '/lists',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'List' as const, id })), 'List'] : ['List']
        }),
        postList: builder.mutation<PostListResponse, PostListBody>({
            query: (body) => ({
                url: '/lists',
                method: 'POST',
                body
            }),
            invalidatesTags: ['List']
        })
    })
});

export const { useLazyGetListsQuery, usePostListMutation } = listsApi;
