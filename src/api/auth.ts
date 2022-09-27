import { api } from 'src/boot/axios';
import { User } from 'src/components/models';

interface PostLoginBody {
    email: string;
    password: string;
}

interface PostLoginResponse {
    token: string;
    user: User;
}

export const postLogin = async (data: PostLoginBody) => {
    return api.post<PostLoginResponse>('/login', data);
};
