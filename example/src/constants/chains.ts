enum SupportedChainIds {
    GOERLI = 5,
    POLYGON = 137,
    OPTIMISM = 10,
    CELO = 42220,
}

const CHAIN_NAMES: {
    [key in SupportedChainIds]: string
} = {
    [SupportedChainIds.GOERLI]: 'Goerli',
    [SupportedChainIds.POLYGON]: 'Polygon',
    [SupportedChainIds.OPTIMISM]: 'Optimism',
    [SupportedChainIds.CELO]: 'Celo',
}

const DEFAULT_CHAIN: SupportedChainIds = SupportedChainIds.GOERLI

export { SupportedChainIds, CHAIN_NAMES, DEFAULT_CHAIN }
