import { ResponsiveValue } from '@chakra-ui/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

export enum ModalTypes {
    AUTH_LOGIN = 'AUTH_LOGIN',
    AUTH_SIGNUP = 'AUTH_SIGNUP',
    LIST_CREATE = 'LIST_CREATE',
    LIST_VIEW = 'LIST_VIEW'
}

type ModalState = {
    is_visible: boolean;
    type: ModalTypes | null;
    size?: ResponsiveValue<
        (string & object) | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl'
    >;
    meta?: {
        list_id?: number;
    };
};

const initialState: ModalState = {
    is_visible: false,
    type: null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<Omit<ModalState, 'is_visible'>>) => {
            state.is_visible = true;
            state.type = action.payload.type;
            state.meta = action.payload.meta;
            state.size = action.payload.size;
        },
        hideModal: (state) => {
            state.is_visible = false;
            state.type = null;
        },
        updateModalMeta: (state, action: PayloadAction<Pick<ModalState, 'meta'>>) => {
            state.meta = action.payload.meta;
        }
    }
});

export const { showModal, hideModal, updateModalMeta } = modalSlice.actions;

export const getModalState = (state: RootState) => state.modal;

export default modalSlice.reducer;
