import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AuthForm from '../auth/AuthForm';
import ListCreateForm from '../list/ListCreateForm';
import ListDetail from '../list/ListDetail';
import { getModalState, hideModal } from './modalSlice';

export default function RootModal() {
    const dispatch = useAppDispatch();
    const { is_visible, type, meta, size } = useAppSelector(getModalState);

    const getModalBody = () => {
        switch (type) {
            case 'AUTH_SIGNUP':
            case 'AUTH_LOGIN':
                return <AuthForm tab={type === 'AUTH_LOGIN' ? 0 : 1} />;
            case 'LIST_CREATE':
                return <ListCreateForm />;
            case 'LIST_VIEW':
                if (meta?.list_id) {
                    return <ListDetail listId={meta.list_id} />;
                }
                return null;
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={is_visible && !!type} onClose={() => dispatch(hideModal())} size={size}>
            <ModalOverlay backdropFilter='blur(2px)' />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody pb={10}>{getModalBody()}</ModalBody>
            </ModalContent>
        </Modal>
    );
}
