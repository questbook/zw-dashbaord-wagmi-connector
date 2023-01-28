import React from 'react';
import { Box, Button, ButtonGroup, Flex, Input } from '@chakra-ui/react';
import axios from 'axios';
import useOwnerAndWebHookAttributes from '../../../hooks/useOwnerAndWebHookAttributes';
import { NewGasTank } from '../../../types';
import { backendUrl } from '../../../api/constants';

interface GasTankCreatorProps {
    projectId: string;
    onCreate?: () => void;
}

export default function GasTankCreator({
    onCreate,
    projectId
}: GasTankCreatorProps) {
    const [chainId, setChainId] = React.useState<string>('');
    const [providerURL, setProviderUrl] = React.useState<string>('');
    const [whitelist, setWhitelist] = React.useState<string[]>([]);
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();

    const handleSubmit = async () => {
        const newGasTank: NewGasTank = {
            chainId: parseInt(chainId),
            providerURL,
            whitelist,
            ...ownerAndWebHookAttributes!
        };
        await axios.post(
            `${backendUrl}/api/dashboard/project/${projectId}/gasTank`,
            newGasTank
        );
        if (onCreate) onCreate();
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            w="50%"
            gap={2}
        >
            <Input
                placeholder="Chain ID"
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
            />
            <Input
                placeholder="Provider URL"
                value={providerURL}
                onChange={(e) => setProviderUrl(e.target.value)}
            />
            <Input
                placeholder="Whitelist"
                value={whitelist}
                onChange={(e) => setWhitelist(e.target.value.split(','))}
            />
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Flex>
    );
}
