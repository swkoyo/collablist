import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthForm() {
    return (
        <Tabs>
            <TabList>
                <Tab>Login</Tab>
                <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <LoginForm />
                </TabPanel>
                <TabPanel>
                    <SignupForm />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
