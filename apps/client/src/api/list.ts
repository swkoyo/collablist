import { Optional } from 'utility-types';
import api from '../redux/rtk';
import { IList, IListItem, IUser, PaginationRequestParams, PaginationResponseData } from '../types';

type GetListsResponse = IList[];

interface PostListBody extends Pick<IList, 'title' | 'description'> {
    items: { title: string }[];
}

type GetListsHistoryParams = PaginationRequestParams;

type GetListsHistoryResponse = PaginationResponseData<IList>;

type PostListResponse = IList;

type PostListItemBody = Pick<IListItem, 'title'> & {
    list_id: number;
};

type PutListItemBody = Optional<Pick<IListItem, 'title' | 'status'>, 'title' | 'status'> & {
    list_item_id: number;
    list_id: number;
};

type DeleteListItemBody = {
    list_item_id: number;
    list_id: number;
};

type PutListBody = Optional<
    Pick<IList, 'id' | 'title' | 'description' | 'is_complete'>,
    'title' | 'description' | 'is_complete'
>;

type PostListMembersResponse = IList['members'];

type PostListMemberBody = {
    list_id: number;
    user_ids: number[];
};

type DeleteListMemberResponse = { user: IUser };

type DeleteListMemberBody = { list_id: number; list_member_id: number };

export const listsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query<GetListsResponse, void>({
            query: () => ({
                url: '/lists'
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.map(({ id }) => ({ type: 'List' as const, id })), 'List'] : ['List']
        }),
        getListsHistory: builder.query<GetListsHistoryResponse, GetListsHistoryParams>({
            query: (params) => ({
                url: '/lists/history',
                params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ id }) => ({ type: 'ListHistory' as const, id })), 'ListHistory']
                    : ['ListHistory']
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
                    if (!data.is_complete) {
                        dispatch(
                            listsApi.util.updateQueryData('getList', id, (draft) => {
                                Object.assign(draft, data);
                            })
                        );
                        dispatch(
                            listsApi.util.updateQueryData('getLists', undefined, (draft) => {
                                const index = draft.findIndex((d) => d.id === id);
                                if (index > -1) {
                                    Object.assign(draft[index], data);
                                }
                            })
                        );
                    }
                } catch {
                    //
                }
            },
            invalidatesTags: (result, error, arg) =>
                result?.is_complete ? ['ListHistory', { type: 'List', id: result.id }] : []
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
                        listsApi.util.updateQueryData('getLists', undefined, (draft) => {
                            const index = draft.findIndex((d) => d.id === list_id);
                            if (index > -1) {
                                draft[index].items.push(data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        deleteList: builder.mutation<IList, IList['id']>({
            query: (id) => ({
                url: `/lists/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => (result ? [{ type: 'List', id: result.id }] : [])
        }),
        putListItem: builder.mutation<IListItem, PutListItemBody>({
            query: ({ list_id, list_item_id, ...body }) => ({
                url: `/lists/${list_id}/items/${list_item_id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted({ list_id, list_item_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', list_id, (draft) => {
                            const index = draft.items.findIndex((i) => i.id === list_item_id);
                            if (index > -1) {
                                Object.assign(draft.items[index], data);
                            }
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', undefined, (draft) => {
                            const listIndex = draft.findIndex((d) => d.id === list_id);
                            if (listIndex > -1) {
                                const itemIndex = draft[listIndex].items.findIndex((i) => i.id === list_item_id);
                                if (itemIndex > -1) {
                                    Object.assign(draft[listIndex].items[itemIndex], data);
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
            query: ({ list_id, list_item_id }) => ({
                url: `/lists/${list_id}/items/${list_item_id}`,
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
                        listsApi.util.updateQueryData('getLists', undefined, (draft) => {
                            const index = draft.findIndex((d) => d.id === list_id);
                            if (index > -1) {
                                draft[index].items = draft[index].items.filter((i) => i.id !== data.id);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        postListMembers: builder.mutation<PostListMembersResponse, PostListMemberBody>({
            query: ({ list_id, user_ids }) => ({
                url: `/lists/${list_id}/members`,
                method: 'POST',
                body: { user_ids }
            }),
            async onQueryStarted({ list_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', list_id, (draft) => {
                            draft.members.push(...data);
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', undefined, (draft) => {
                            const index = draft.findIndex((d) => d.id === list_id);
                            if (index > -1) {
                                draft[index].members.push(...data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        deleteListMember: builder.mutation<DeleteListMemberResponse, DeleteListMemberBody>({
            query: ({ list_id, list_member_id }) => ({
                url: `/lists/${list_id}/members/${list_member_id}`,
                method: 'DELETE'
            }),
            async onQueryStarted({ list_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        listsApi.util.updateQueryData('getList', list_id, (draft) => {
                            draft.members = draft.members.filter((i) => i.user.id !== data.user.id);
                        })
                    );
                    dispatch(
                        listsApi.util.updateQueryData('getLists', undefined, (draft) => {
                            const index = draft.findIndex((d) => d.id === list_id);
                            if (index > -1) {
                                draft[index].members = draft[index].members.filter((i) => i.user.id !== data.user.id);
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
    useLazyGetListsHistoryQuery,
    useLazyGetListsQuery,
    usePostListMutation,
    useLazyGetListQuery,
    usePostListItemMutation,
    usePutListItemMutation,
    useDeleteListItemMutation,
    usePutListMutation,
    usePostListMembersMutation,
    useDeleteListMemberMutation,
    useDeleteListMutation,
    endpoints: {
        getLists: { useQueryState: useGetListsQueryState }
    }
} = listsApi;
