import { FiPlusCircle } from 'react-icons/fi';
import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { ProjectsContext } from '../../../../pages/_app';
import { useContext } from 'react';

const ProjectNavItem = ({ ...rest }: FlexProps) => {
    const { setSelectedEntity } = useContext(ProjectsContext)!;
    return (
        <>
            <Box
                onClick={() => {
                    setSelectedEntity({ createNew: 'project' });
                }}
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
            >
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                    {...rest}
                >
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white'
                        }}
                        as={FiPlusCircle}
                    />
                    New Project
                </Flex>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    ml="auto"
                />
            </Box>
        </>
    );
};

export default ProjectNavItem;
