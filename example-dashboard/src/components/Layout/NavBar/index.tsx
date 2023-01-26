import React, { ReactNode, ReactText, useContext } from 'react';
import {
    Box,
    Drawer,
    DrawerContent,
    useColorModeValue
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';

export default function SimpleSidebar({ children }: { children: ReactNode }) {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => {}}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={false}
                placement="left"
                onClose={() => {}}
                returnFocusOnClose={false}
                onOverlayClick={() => {}}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={() => {}} />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}
