import { EditIcon } from '@chakra-ui/icons';
import { Avatar, Center, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth';
import { IUser } from '../../../types';
import { formatDate } from '../../../utils/dayjs';
import EditProfileForm from './EditProfileForm';

export default function Profile() {
    const auth = useAuth() as IUser;
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (isOpen) {
        return <EditProfileForm onClose={onClose} />;
    }

    return (
        <Center mt={4} flexDirection='column'>
            <Avatar size='2xl' name={`${auth.first_name} ${auth.last_name}`} src={auth.avatar_url} />
            <Text>
                {auth.first_name} {auth.last_name} ({auth.username})
            </Text>
            <Text>{auth.email}</Text>
            <Text>Member since: {formatDate(auth.created_at)}</Text>
            <IconButton aria-label='Edit Profile' onClick={() => onOpen()} icon={<EditIcon />} />
        </Center>
    );
}
