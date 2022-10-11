import api from '../redux/rtk';
import { IList, PaginationRequestParams, PaginationResponseData } from '../types';

type GetListsParams = PaginationRequestParams;

type GetListsResponse = PaginationResponseData<IList>;

type PostListBody = Pick<IList, 'title' | 'description'>;

type PostListResponse = IList;

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
        }),
        getList: builder.query<IList, number>({
            query: (listId) => ({
                url: `/lists/${listId}`
            }),
            providesTags: (result, error, arg) =>
                result ? [{ type: 'List' as const, id: result.id }, 'List'] : ['List']
        })
    })
});

export const { useLazyGetListsQuery, usePostListMutation, useLazyGetListQuery } = listsApi;
