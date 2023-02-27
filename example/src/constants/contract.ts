

const addressByChainId: { [key: number]: string } = {
    5: '0xA119f2120E82380DC89832B8F3740fDC47b0444f',
    10: '0x05c43C08FC9444AD612723ab43EF92c6c66ab892'
}

const contractAbi = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'x',
                type: 'uint256'
            }
        ],
        name: 'set',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'value',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];

export { addressByChainId, contractAbi };
