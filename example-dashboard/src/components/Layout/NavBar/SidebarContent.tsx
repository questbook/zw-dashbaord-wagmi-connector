import { useContext } from 'react';
import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { ProjectsContext } from '../../../../pages/_app';
import ProjectNavItem from './ProjectNavItem';
import { useAccount } from 'wagmi';
import ProjectAdder from './ProjectAdder';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const { isConnected } = useAccount()
    const { projects, doesScwExist } = useContext(ProjectsContext)!;

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                />
            </Flex>
            {doesScwExist ? (
                <>
                    {projects.sort((a, b) => a.name < b.name ? -1 : 1).map((project) => (
                        <ProjectNavItem
                            key={project.name}
                            project={project}
                        />
                    ))}

                    <ProjectAdder />
                </>

            ) : (
                isConnected ? (
                    <Text>Deploying SCW...</Text>) : <Text textAlign="center" color="red.500">
                    Please connect zero wallet </Text>
            )}
        </Box>
    );
};

export default SidebarContent;
