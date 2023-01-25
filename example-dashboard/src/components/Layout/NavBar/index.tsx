
import React, { ReactNode, ReactText } from 'react';
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';


export default function SimpleSidebar({ children }: { children: ReactNode }) {
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => { }}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={false}
                placement="left"
                onClose={() => { }}
                returnFocusOnClose={false}
                onOverlayClick={() => { }}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={() => { }} />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}






