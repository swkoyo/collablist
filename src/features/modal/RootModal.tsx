import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AuthForm from '../auth/AuthForm';
import { getModalState, hideModal } from './modalSlice';

export default function RootModal() {
    const dispatch = useAppDispatch();
    const { is_visible, type } = useAppSelector(getModalState);

    const getModalBody = () => {
        switch (type) {
            case 'AUTH_SIGNUP':
            case 'AUTH_LOGIN':
                return <AuthForm tab={type === 'AUTH_LOGIN' ? 0 : 1} />;
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={is_visible && !!type} onClose={() => dispatch(hideModal())}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>{getModalBody()}</ModalBody>
            </ModalContent>
        </Modal>
    );
}
