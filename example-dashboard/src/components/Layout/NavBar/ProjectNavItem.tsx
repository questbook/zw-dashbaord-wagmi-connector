import { FiHome } from 'react-icons/fi';
import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IProject } from '../../../types';
import GasTankNavItem from './GasTankNavItem';
import { ProjectsContext } from '../../../../pages/_app';
import { useContext } from 'react';
import GasTankAdder from './GasTankAdder';

interface NavItemProps extends FlexProps {
    project: IProject
}

const ProjectNavItem = ({ project, ...rest }: NavItemProps) => {
    const { name: text, gasTanks } = project;
    const { setSelectedEntity } = useContext(ProjectsContext)!
    return (
        <>
            <Box
                onClick={(e) => { setSelectedEntity(project) }}
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
                        as={FiHome}
                    />
                    {text}
                </Flex>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    ml="auto"
                />
            </Box>
            <Flex flexDir="column" ml="1rem" px="1rem">
                {gasTanks
                    .sort((a, b) => parseInt(a.chain_id) - parseInt(b.chain_id))
                    .map((gasTank) => (
                        <GasTankNavItem
                            key={gasTank.gas_tank_id}
                            {...gasTank}
                        />
                    ))}
                    <GasTankAdder projectId={project.project_id} />
            </Flex>
        </>
    );
};

export default ProjectNavItem;
