import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NavBar from './NavBar';

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            <Container>{children}</Container>
        </>
    );
}
