import { ChakraProvider } from '@chakra-ui/react';
import { getDefaultProvider } from 'ethers';
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { chain, createClient, WagmiConfig } from 'wagmi';
import {
    ZeroWalletConnector,
    ZeroWalletConnectorOptions
} from 'zero-wallet-wagmi-connector';

const zeroWalletConnectorOptions: ZeroWalletConnectorOptions = {
    zeroWalletServerDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN!,
    zeroWalletProjectApiKey: process.env.NEXT_PUBLIC_ZERO_WALLET_API_KEY!,
}

const connector = new ZeroWalletConnector({
    chains: [chain.goerli, chain.optimism],
    options: zeroWalletConnectorOptions
});

const provider = getDefaultProvider();

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

export const ScwContext = createContext<{
    doesScwExist: boolean
    setDoesScwExist: (newState: boolean) => void
} | null>(null)

export default function App({ Component, pageProps }: AppProps) {
    const [doesScwExist, setDoesScwExist] = useState<boolean>(false)

    const projectsContextValue = { doesScwExist, setDoesScwExist }

    return (
        <WagmiConfig client={client}>
            <ChakraProvider>
                <ScwContext.Provider value={projectsContextValue}>
                    <Component {...pageProps} />
                </ScwContext.Provider>
            </ChakraProvider>
        </WagmiConfig>
    );
}
