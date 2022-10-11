import api from '../redux/rtk';
import { IUser, SuccessResponse } from '../types';

interface PostLoginBody {
    email: string;
    password: string;
}

interface PostLoginResponse {
    token: string;
    user: IUser;
}

interface PostSignupBody extends PostLoginBody {
    password_confirmation: string;
    first_name: string;
    last_name: string;
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
        signup: builder.mutation<SuccessResponse, PostSignupBody>({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body
            })
        }),
        checkToken: builder.query<IUser, string>({
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

export const { useLoginMutation, useLazyCheckTokenQuery, useSignupMutation } = authApi;
