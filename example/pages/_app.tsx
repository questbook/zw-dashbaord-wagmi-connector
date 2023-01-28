import { ChakraProvider } from '@chakra-ui/react';
import { getDefaultProvider } from 'ethers';
import type { AppProps } from 'next/app';
import { chain, createClient, WagmiConfig } from 'wagmi';
import {
    ZeroWalletConnector,
    ZeroWalletConnectorOptions
} from 'zero-wallet-wagmi-connector';

const zeroWalletConnectorOptions: ZeroWalletConnectorOptions = {
    jsonRpcProviderUrls: {
        5: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    },
    store: 'browser',
    zeroWalletServerDomain: process.env.NEXT_PUBLIC_BACKEND_DOMAIN!,
    zeroWalletProjectApiKey: process.env.NEXT_PUBLIC_ZERO_WALLET_API_KEY!,
}

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

export default function App({ Component, pageProps }: AppProps) {

    return (
        <WagmiConfig client={client}>
            <ChakraProvider>
                    <Component {...pageProps} />
            </ChakraProvider>
        </WagmiConfig>
    );
}
