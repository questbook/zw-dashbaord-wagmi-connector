import { useContext } from 'react';
import { FiCompass } from 'react-icons/fi';
import { Box,Flex, Icon } from '@chakra-ui/react';
import { GasTankType } from '../../../types';
import { ProjectsContext } from '../../../../pages/_app';

const GasTankNavItem = (props: GasTankType) => {
    const { chain_id: chainId } = props;
    const { setSelectedEntity } = useContext(ProjectsContext)!
    return (
        <Box
            onClick={(e) => setSelectedEntity(props)}
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
                    as={FiCompass}
                />
                {chainId}
            </Flex>
        </Box>
    );
};

export default GasTankNavItem;
