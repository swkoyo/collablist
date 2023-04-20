import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants';
import { resetAuth } from '../features/auth/authSlice';
import type { RootState } from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).auth;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401 && (api.getState() as RootState).auth.user) {
        api.dispatch(resetAuth());
    }
    return result;
};

const emptySplitApi = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['UNAUTHORIZED', 'UNKNOWN_ERROR', 'List', 'User', 'ListHistory'],
    endpoints: () => ({})
});

export default emptySplitApi;
