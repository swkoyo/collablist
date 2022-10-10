import api from '../redux/rtk';
import { List, PaginationRequestParams, PaginationResponseData } from '../types';

type GetListsParams = PaginationRequestParams;

type GetListsResponse = PaginationResponseData<List>;

export const listsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLists: builder.query<GetListsResponse, GetListsParams>({
            query: (params) => ({
                url: '/lists',
                params
            })
        })
    })
});

export const { useLazyGetListsQuery } = listsApi;
