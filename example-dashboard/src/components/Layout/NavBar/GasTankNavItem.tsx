import { Flex, Icon, Box } from "@chakra-ui/react";
import { FiCompass } from "react-icons/fi";


export interface GasTankProps {
    chainId: string;
}

const GasTankNavItem = ({ chainId }: GasTankProps) => {
    return (
        <Box onClick={(e) => { }} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
                    color: 'white',
                }}>
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                        color: 'white',
                    }}
                    as={FiCompass}
                />
                {chainId}
            </Flex>
        </Box>
    );
};

export default GasTankNavItem;