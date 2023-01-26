import React from 'react';
import { Button, ButtonGroup, Flex, Input } from '@chakra-ui/react';
import { GasTankType } from '../../../types';
import { Contract, providers, utils } from 'ethers';
import { abi, address as contractAddress } from '../../../contract/constants';

export default function GasTankViewer({
    gas_tank_id,
    project_id,
    created_at,
    chain_id,
    provider_url,
    funding_key,
    whitelist,
    balance
}: GasTankType) {
    const [fillAmount, setFillAmount] = React.useState<string>('');

    const handleFill = async () => {
        // @ts-ignore
        if (!window.ethereum) throw new Error("Couldn't connect to Metamask");

        // @ts-ignore
        const provider = new providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contract = new Contract(contractAddress, abi, signer);
        const address = await signer.getAddress();
        console.log(utils.parseUnits(fillAmount).toBigInt());
        const tx = await contract.depositFor(parseInt(funding_key), {
            from: address,
            value: utils.parseUnits(fillAmount)
        });
        let receipt = await tx.wait(1);
        console.log('receipt', receipt);
    };

    // show gas tank details
    return (
        <Flex direction="column" alignItems="center" justifyContent="center">
            <Flex>
                Gas Tank ID: {gas_tank_id}
                <br />
                Project ID: {project_id}
                <br />
                Create at: {new Date(created_at).toDateString()}
                <br />
                Chain ID: {chain_id}
                <br />
                Provider URL: {provider_url}
                <br />
                Contracts Whitelist: {whitelist}
                <br />
                Balance: {balance}
            </Flex>
            <Input
                type="number"
                value={fillAmount}
                onChange={(e) => setFillAmount(e.target.value)}
            />
            <ButtonGroup>
                <Button onClick={() => handleFill()}>Fill</Button>
            </ButtonGroup>
        </Flex>
    );
}
