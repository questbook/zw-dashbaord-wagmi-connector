import { createContext, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getDefaultProvider } from 'ethers';
import type { AppProps } from 'next/app';
import { chain, createClient, WagmiConfig } from 'wagmi';
import {
    RecoveryConfig,
    ZeroWalletConnector,
    ZeroWalletConnectorOptions
} from 'zero-wallet-wagmi-connector';
import Layout from '../src/components/Layout';
import { EntityType, IGasTank, IProject } from '../src/types';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// const googleRecoveryOption: RecoveryConfig = {
//     type: 'google-web-recovery',
//     googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//     allowMultiKeys: false,
//     handleExistingKey: 'Overwrite'
// };

const metamaskRecoveryOption: RecoveryConfig = {
    type: 'metamask-recovery'
};

const zeroWalletConnectorOptions: ZeroWalletConnectorOptions = {
    jsonRpcProviderUrls: {
        5: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        10: undefined,
        137: undefined,
        42220: undefined
    },
    store: 'browser',
    zeroWalletServerDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN!,
    zeroWalletProjectApiKey: process.env.NEXT_PUBLIC_ZERO_WALLET_API_KEY!,
    gasTankName: 'testnet',
    recovery: metamaskRecoveryOption
};

const connector = new ZeroWalletConnector({
    chains: [chain.goerli],
    options: zeroWalletConnectorOptions
});

const provider = getDefaultProvider(chain.goerli.id);

const client = createClient({
    autoConnect: false,
    provider,
    connectors: [
        // new MetaMaskConnector({
        //     chains: [chain.goerli],
        //     options: {
        //         shimDisconnect: true,
        //     },
        // }),
        connector
    ]
});

export const ProjectsContext = createContext<{
    doesScwExist: boolean;
    setDoesScwExist: (newState: boolean) => void;
    projects: IProject[];
    setProjects: (projects: IProject[]) => void;
    selectedEntity: EntityType | null;
    setSelectedEntity: (entry: EntityType | null) => void;
} | null>(null);

export default function App({ Component, pageProps }: AppProps) {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(
        null
    );
    const [doesScwExist, setDoesScwExist] = useState<boolean>(false);

    const projectsContextValue = {
        projects,
        setProjects,
        selectedEntity,
        setSelectedEntity,
        doesScwExist,
        setDoesScwExist
    };

    return (
        <WagmiConfig client={client}>
            <ChakraProvider>
                <ProjectsContext.Provider value={projectsContextValue}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ProjectsContext.Provider>
            </ChakraProvider>
        </WagmiConfig>
    );
}
