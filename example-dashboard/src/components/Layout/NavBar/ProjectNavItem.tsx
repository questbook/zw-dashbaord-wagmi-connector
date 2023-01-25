import { FlexProps, Flex, Icon, Box } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import GasTankNavItem, { GasTankProps } from "./GasTankNavItem";

interface NavItemProps extends FlexProps {
    text: string;
    gasTanks: {
        [key: string]: GasTankProps
    };
}


const ProjectNavItem = ({ text, gasTanks, ...rest }: NavItemProps) => {
    return (
        <>
            <Box onClick={(e) => { }} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white',
                    }}
                    {...rest}>
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
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
                >
                </Flex>
            </Box>
            <Flex flexDir={'column'} ml='3rem' px='1rem'>
                {Object.keys(gasTanks).map((key) => (
                    <GasTankNavItem key={key} {...gasTanks[key]} />
                ))}
            </Flex>
        </>
    );
};

export default ProjectNavItem;