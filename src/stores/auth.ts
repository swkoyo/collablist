import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { postLogin } from 'src/api/auth';
import { User } from 'src/components/models';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as User | null
    }),

    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return !!state.token && !!state.user;
        },
        role(state) {
            return state.user?.role;
        }
    },

    actions: {
        logout() {
            this.token = null;
            this.user = null;
        },
        async login(email: string, password: string) {
            try {
                const data = await postLogin({ email, password });
                this.token = data.data.token;
                this.user = data.data.user;
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    Notify.create(
                        err.response?.data.message || 'Something went wrong'
                    );
                } else {
                    Notify.create('Login failed');
                }
            }
        }
    }
});
