import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Connector, useAccount, useConnect } from "wagmi";



// header component with wagmi connect button
export default function Header() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    const handleConnect = async () => {
        connect({ connector: connectors[0] });
    };

    return (
        <header>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                h="100%"
                p="1rem"
                m='1rem'
            >
                <Flex>
                    <Heading as="h1" size="lg" color="white" mr="1rem">
                        Wagmi
                    </Heading>
                </Flex>
                <Flex
                    gap={5}
                    alignItems="center"
                    justifyContent={isConnected ? "flex-end" : "center"}
                    >
                    <Text>{isConnected && address}</Text>
                    <Button
                        colorScheme="blue"
                        mr="1rem"
                        onClick={() => handleConnect()}
                    >
                        Connect
                    </Button>
                </Flex>
            </Flex>
        </header>
    );
}
