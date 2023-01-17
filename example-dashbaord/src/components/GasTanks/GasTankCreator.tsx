import { Input, ButtonGroup, Button, Box } from "@chakra-ui/react";
import React from "react";
import { NewGasTank } from "../../types";
import axios from "axios";
import useOwnerAndWebHookAttributes from "../../hooks/useOwnerAndWebHookAttributes";

interface GasTankCreatorProps {
    projectId: string;
    onCreate: () => void;
}

export default function GasTankCreator({ onCreate, projectId }: GasTankCreatorProps) {

    const [name, setName] = React.useState<string>('');
    const [chain_id, setChainId] = React.useState<string>('');
    const [provider_url, setProviderUrl] = React.useState<string>('');
    const [whitelist, setWhitelist] = React.useState<string[]>([]);
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()

    const handleSubmit = async () => {

        const newGasTank: NewGasTank = {
            name,
            chain_id,
            provider_url,
            whitelist,
            ...ownerAndWebHookAttributes!,
        }
        console.table(newGasTank)
        await axios.post(`http://localhost:3000/api/dashboard/project/${projectId}/gasTanks`, newGasTank);
        onCreate()
    }

    return (
        <Box>
            <Input placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Chain ID" value={chain_id} onChange={(e) => setChainId(e.target.value)} />
            <Input placeholder="Provider URL" value={provider_url} onChange={(e) => setProviderUrl(e.target.value)} />
            <Input placeholder="Whitelist" value={whitelist} onChange={(e) => setWhitelist(e.target.value.split(','))} />
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Box>
    );
}
