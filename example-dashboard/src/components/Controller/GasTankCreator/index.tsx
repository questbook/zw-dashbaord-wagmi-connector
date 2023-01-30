import React from 'react';
import { Box, Button, ButtonGroup, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import useOwnerAndWebHookAttributes from '../../../hooks/useOwnerAndWebHookAttributes';
import { NewGasTank } from '../../../types';
import { backendUrl } from '../../../api/constants';
import MultiInputUpdater from '../../UI/MultiInputUpdater';

interface GasTankCreatorProps {
    projectId: string;
    onCreate?: () => void;
}

const ADDRESS_PLACEHOLDER = '0x1234...';

export default function GasTankCreator({
    onCreate,
    projectId
}: GasTankCreatorProps) {
    const [chainId, setChainId] = React.useState<string>('');
    const [providerURL, setProviderUrl] = React.useState<string>('');
    const [whitelist, setWhitelist] = React.useState<string[]>([ADDRESS_PLACEHOLDER]);
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
            // display={{ base: 'block', md: 'flex'}}
            // display={'flex'}
            alignItems="center"
            justifyContent="center"
            w="50%"
            gap={2}
        >

            <Text as="b">Chain ID</Text>
            <Input
                placeholder="Chain ID"
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
                w='sm'
            />

                <Text as="b">Whitelist</Text>
                <MultiInputUpdater
                    values={whitelist}
                    onChange={(newValues: string[]) => setWhitelist(newValues)}
                    canAdd={true}
                    defaultNewValue={ADDRESS_PLACEHOLDER}
                />
            
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Flex>
    );
}
