import { useContext } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Box,Flex, Icon } from '@chakra-ui/react';
import { ProjectsContext } from '../../../../pages/_app';

interface Props {
    projectId: string;
}

const GasTankNavItem = ({ projectId }: Props) => {
    const { setSelectedEntity } = useContext(ProjectsContext)!
    return (
        <Box
            onClick={() => setSelectedEntity({ createNew: 'gasTank', projectId })}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                ml="4"
                // width={'full'}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white'
                }}
            >
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: 'white'
                    }}
                    as={FiPlusCircle}
                />
                New Gas Tank
            </Flex>
        </Box>
    );
};

export default GasTankNavItem;
