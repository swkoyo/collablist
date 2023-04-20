import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthForm({ tab }: { tab: number }) {
    const [selectedTab, setSelectedTab] = useState(tab);

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <Tabs isFitted index={selectedTab} onChange={handleTabChange}>
            <TabList mb={4}>
                <Tab>Login</Tab>
                <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <LoginForm />
                </TabPanel>
                <TabPanel>
                    <SignupForm handleTabChange={handleTabChange} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
