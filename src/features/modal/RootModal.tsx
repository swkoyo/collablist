import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AuthForm from '../auth/AuthForm';
import { getModalState, hideModal } from './modalSlice';

export default function RootModal() {
    const dispatch = useAppDispatch();
    const { is_visible, type } = useAppSelector(getModalState);

    const getModalBody = () => {
        switch (type) {
            case 'AUTH':
                return <AuthForm />;
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={is_visible && !!type} onClose={() => dispatch(hideModal())}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{getModalBody()}</ModalBody>
            </ModalContent>
        </Modal>
    );
}
