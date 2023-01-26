import { useContext, useEffect } from 'react';
import { Box, Button, ButtonGroup, Flex, useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import { Connector, useAccount, useConnect, useSigner } from 'wagmi';
import { ZeroWalletSigner } from 'zero-wallet-wagmi-connector';
import { getProjects } from '../src/api/getProjects';
import SmartViewer from '../src/components/Controller';
import useOwnerAndWebHookAttributes from '../src/hooks/useOwnerAndWebHookAttributes';
import { ProjectsContext } from './_app';

export default function Home() {
    const { setProjects, doesScwExist, setDoesScwExist } =
        useContext(ProjectsContext)!;
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();

    // wagmi hooks
    const { address } = useAccount();
    const { data: signer } = useSigner<ZeroWalletSigner>();
    const { connect, connectors } = useConnect();

    // chakra hooks
    const { setColorMode } = useColorMode();
    useEffect(() => {
        setColorMode('dark');
        // @ts-ignore
    }, []);

    useEffect(() => {
        const func = async () => {
            if (signer && !doesScwExist) {
                try {
                    try {
                        await signer.authorize();
                    } catch { }

                    await signer.deployScw();
                    setDoesScwExist(true);
                } catch { }
            }
        };

        func();
    }, [signer, doesScwExist]);

    const updateProjects = async () => {
        if (doesScwExist && ownerAndWebHookAttributes?.ownerScw) {
            const projects = await getProjects(ownerAndWebHookAttributes);
            setProjects(projects);
        }
    }

    useEffect(() => {
        updateProjects()
    }, [
        doesScwExist,
        ownerAndWebHookAttributes
    ]);

    const handleConnect = async (connector: Connector) => {
        connect({ connector: connector });
    };

    return (
        <Flex justifyContent="center" alignItems="center" dir="column" minHeight={"60vh"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!signer ? (
                <ButtonGroup>
                    {connectors.map((connector, index) => (
                        <Button
                            key={index}
                            onClick={() => handleConnect(connector)}
                        >
                            Connect {connector.name}
                        </Button>
                    ))}
                </ButtonGroup>
            ) : (
                <SmartViewer updateProjects={updateProjects} />

            )}
        </Flex>
    );
}
