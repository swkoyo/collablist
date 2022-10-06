import api from '../redux/rtk';
import type { User } from '../types';

interface PostLoginBody {
    email: string;
    password: string;
}

interface PostLoginResponse {
    token: string;
    user: User;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<PostLoginResponse, PostLoginBody>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        checkToken: builder.query<User, string>({
            query: (token) => ({
                url: '/check-token',
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        })
    })
});

export const { useLoginMutation, useLazyCheckTokenQuery } = authApi;
