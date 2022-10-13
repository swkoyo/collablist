import api from '../redux/rtk';
import { IList, IListItem, PaginationRequestParams, PaginationResponseData } from '../types';

type GetListsParams = PaginationRequestParams;

type GetListsResponse = PaginationResponseData<IList>;

type PostListBody = Pick<IList, 'title' | 'description'>;

type PostListResponse = IList;

type PostListItemBody = Pick<IListItem, 'title'> & {
    list_id: number;
};

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
        }),
        postListItem: builder.mutation<IListItem, PostListItemBody>({
            query: ({ list_id, title }) => ({
                url: `/lists/${list_id}/items`,
                method: 'POST',
                body: { title }
            }),
            async onQueryStarted({ list_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', list_id, (draft) => {
                            draft.items.push(data);
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', {}, (draft) => {
                            const list = draft.data.find((d) => d.id === list_id);
                            if (list) {
                                list.items.push(data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        })
    })
});

export const { useLazyGetListsQuery, usePostListMutation, useLazyGetListQuery, usePostListItemMutation } = listsApi;
