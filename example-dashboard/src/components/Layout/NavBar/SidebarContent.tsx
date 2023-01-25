import { BoxProps, useColorModeValue, Flex, CloseButton, Box, Text } from "@chakra-ui/react";
import { GasTankProps } from "./GasTankNavItem";
import ProjectNavItem from "./ProjectNavItem";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

interface ProjectItemProps {
    name: string;
    gasTanks: {
        [key: string]: GasTankProps
    }
}

const LinkItems: Array<ProjectItemProps> = [
    {
        name: 'Project 1',
        gasTanks: {
            '5': {
                chainId: "5"
            },
        },
    }
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <ProjectNavItem key={link.name} text={link.name} gasTanks={link.gasTanks} />
            ))}
        </Box>
    );
};

export default SidebarContent;