import { getAddress } from 'ethers/lib/utils';
import { Chain, Connector, ConnectorData } from 'wagmi';
import { SupportedChainId } from './constants/chains';
import { IStoreable } from './store/IStoreable';
import { StorageFactory } from './store/storageFactory';
import { normalizeChainId } from './utils/normalizeChainId';
import { ZeroWalletProvider } from './provider';
import { ZeroWalletSigner } from './signer';
import { ZeroWalletConnectorOptions } from './types';

export class ZeroWalletConnector extends Connector<
    ZeroWalletProvider,
    ZeroWalletConnectorOptions,
    ZeroWalletSigner
> {
    readonly id = 'zero-wallet';
    readonly name = 'Zero Wallet';

    private provider: ZeroWalletProvider;
    // private providers: { [key in SupportedChainId]?: ZeroWalletProvider } = {};
    private store: IStoreable;

    constructor(config: {
        chains?: Chain[];
        options: ZeroWalletConnectorOptions;
    }) {
        super(config);

        this.store = StorageFactory.create('browser');
        this.onAccountsChanged = this.onAccountsChanged.bind(this);
        this.onChainChanged = this.onChainChanged.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);

        if (config.chains) {
            const chain = config.chains[0];

            this.provider = new ZeroWalletProvider(
                {
                    chainId: chain.id,
                    name: chain.name,
                    url: chain.rpcUrls.default
                },
                this.store,
                config.options.zeroWalletServerDomain,
                config.options.zeroWalletProjectApiKey,
                config.options.recovery
            );
        }
    }

    /**
     * @returns boolean - true if localStorge is available, false otherwise
     */
    get ready() {
        try {
            if (localStorage) {
                return true;
            }
        } catch {
            return false;
        } finally {
            return false;
        }
    }

    async connect(): Promise<Required<ConnectorData>> {
        // if (this.store.get('ZeroWalletConnected') === 'true') {
        //     throw new Error('Already connected!');
        // }

        const provider = await this.getProvider();
        if (!provider) throw new Error('Provider not found');

        if (provider.on) {
            provider.on('accountsChanged', this.onAccountsChanged);
            provider.on('chainChanged', this.onChainChanged);
            provider.on('disconnect', this.onDisconnect);
        }

        const signer = this.provider.getSigner(undefined, false);
        await signer.initSignerPromise;

        this.emit('message', { type: 'connecting' });

        await this.store.set('ZeroWalletConnected', 'true');

        const chainId = await this.getChainId();

        return {
            account: await signer.getAddress(),
            chain: {
                id: chainId,
                unsupported: false
            },
            provider: this.provider
        };
    }

    async disconnect(): Promise<void> {
        // if (this.store.get('ZeroWalletConnected') === 'false') {
        //     throw new Error('Already disconnected!');
        // }

        const provider = await this.getProvider();
        if (!provider?.removeListener) return;

        provider.removeListener('accountsChanged', this.onAccountsChanged);
        provider.removeListener('chainChanged', this.onChainChanged);
        provider.removeListener('disconnect', this.onDisconnect);

        await this.store.set('ZeroWalletConnected', 'false');
    }

    async getAccount(): Promise<`0x${string}`> {
        const signer = await this.getSigner();
        return await signer.getAddress();
    }

    async getChainId(): Promise<number> {
        return (await this.getProvider())
            .getNetwork()
            .then((network) => network.chainId);
    }

    async getProvider(): Promise<ZeroWalletProvider> {
        return this.provider;
    }

    async getSigner(): Promise<ZeroWalletSigner> {
        return this.provider.getSigner();
    }

    async isAuthorized(): Promise<boolean> {
        return (
            (await this.store.get('ZeroWalletConnected')) === 'true' &&
            (await this.store.get('zeroWalletPrivateKey')) !== undefined
        );
    }

    async switchChain(chainId: SupportedChainId): Promise<Chain> {
        const chain = this.chains.find((c) => c.id === chainId);
        if (!chain) throw new Error('No chain found for chainId: ' + chainId);

        // disconnecting old provider
        const oldProvider = this.provider;
        oldProvider.removeListener('accountsChanged', this.onAccountsChanged);
        oldProvider.removeListener('chainChanged', this.onChainChanged);
        oldProvider.removeListener('disconnect', this.onDisconnect);

        // creating a new provider
        const newProvider = (this.provider = new ZeroWalletProvider(
            {
                chainId: chain.id,
                name: chain.name,
                url: chain.rpcUrls.default
            },
            this.store,
            this.options.zeroWalletServerDomain,
            this.options.zeroWalletProjectApiKey,
            this.options.recovery
        ));

        newProvider.on('accountsChanged', this.onAccountsChanged);
        newProvider.on('chainChanged', this.onChainChanged);
        newProvider.on('disconnect', this.onDisconnect);
        this.provider = newProvider;
        this.provider.connectToConnector();
        return chain;
    }

    protected onAccountsChanged(accounts: string[]) {
        if (accounts.length === 0) this.emit('disconnect');
        else {
            const newData = {
                account: getAddress(accounts[0] as string)
            };
            this.emit('change', newData);
        }
    }

    protected onChainChanged(chainId: number | string) {
        const id = normalizeChainId(chainId);
        const unsupported = this.isChainUnsupported(id);
        this.emit('change', { chain: { id, unsupported } });
    }

    protected onDisconnect() {
        this.emit('disconnect');
    }
}
