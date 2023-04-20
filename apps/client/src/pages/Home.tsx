import { Box, Stack, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import MainContainer from '../layouts/MainContainer';

export default function Home() {
    const auth = useAuth();

    if (auth) {
        return <Navigate to='/dashboard' />;
    }

    return (
        <MainContainer>
            <Box
                height='70vh'
                backgroundImage="url('/collab-main.svg')"
                backgroundPosition='bottom'
                backgroundSize='600px'
                backgroundRepeat='no-repeat'
            >
                <Stack textAlign='center' alignItems='center' pt={20} gap={0}>
                    <Text fontSize='5xl'>Collaborate with your friends</Text>
                    <Text fontSize='3xl'>Stay on top of your tasks</Text>
                    <Text pt={5} width='container.sm'>
                        Collablist gives you the confidence that everything’s organized and accounted for, so you can
                        make progress on the things that are important to you.
                    </Text>
                </Stack>
            </Box>
        </MainContainer>
    );
}
