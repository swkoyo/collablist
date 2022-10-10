import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

export enum ModalTypes {
    AUTH_LOGIN = 'AUTH_LOGIN',
    AUTH_SIGNUP = 'AUTH_SIGNUP',
    LIST_CREATE = 'LIST_CREATE'
}

type ModalState = {
    is_visible: boolean;
    type: ModalTypes | null;
};

const initialState: ModalState = {
    is_visible: false,
    type: null
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<ModalTypes>) => {
            state.is_visible = true;
            state.type = action.payload;
        },
        hideModal: (state) => {
            state.is_visible = false;
            state.type = null;
        }
    }
});

export const { showModal, hideModal } = modalSlice.actions;

export const getModalState = (state: RootState) => state.modal;

export default modalSlice.reducer;
