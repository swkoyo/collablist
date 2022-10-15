import { Optional } from 'utility-types';
import api from '../redux/rtk';
import { IList, IListItem, PaginationRequestParams, PaginationResponseData } from '../types';

type GetListsParams = PaginationRequestParams;

type GetListsResponse = PaginationResponseData<IList>;

type PostListBody = Pick<IList, 'title' | 'description'>;

type PostListResponse = IList;

type PostListItemBody = Pick<IListItem, 'title'> & {
    list_id: number;
};

type PutListItemBody = Optional<Pick<IListItem, 'id' | 'title' | 'status'>, 'title' | 'status'> & {
    list_id: number;
};

type DeleteListItemBody = {
    id: number;
    list_id: number;
};

type PutListBody = Optional<Pick<IList, 'id' | 'title' | 'description'>, 'title' | 'description'>;

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
        putList: builder.mutation<IList, PutListBody>({
            query: ({ id, ...body }) => ({
                url: `/lists/${id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', id, (draft) => {
                            Object.assign(draft, data);
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', {}, (draft) => {
                            const index = draft.data.findIndex((d) => d.id === id);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
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
                            const index = draft.data.findIndex((d) => d.id === list_id);
                            if (index > -1) {
                                draft.data[index].items.push(data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putListItem: builder.mutation<IListItem, PutListItemBody>({
            query: ({ list_id, id, ...body }) => ({
                url: `/lists/${list_id}/items/${id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted({ list_id, id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', list_id, (draft) => {
                            const index = draft.items.findIndex((i) => i.id === id);
                            if (index > -1) {
                                Object.assign(draft.items[index], data);
                            }
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', {}, (draft) => {
                            const listIndex = draft.data.findIndex((d) => d.id === list_id);
                            if (listIndex > -1) {
                                const itemIndex = draft.data[listIndex].items.findIndex((i) => i.id === id);
                                if (itemIndex > -1) {
                                    Object.assign(draft.data[listIndex].items[itemIndex], data);
                                }
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        deleteListItem: builder.mutation<IListItem, DeleteListItemBody>({
            query: ({ list_id, id }) => ({
                url: `/lists/${list_id}/items/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted({ list_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', list_id, (draft) => {
                            draft.items = draft.items.filter((i) => i.id !== data.id);
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', {}, (draft) => {
                            const index = draft.data.findIndex((d) => d.id === list_id);
                            if (index > -1) {
                                draft.data[index].items = draft.data[index].items.filter((i) => i.id !== data.id);
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

export const {
    useLazyGetListsQuery,
    usePostListMutation,
    useLazyGetListQuery,
    usePostListItemMutation,
    usePutListItemMutation,
    useDeleteListItemMutation,
    usePutListMutation
} = listsApi;
