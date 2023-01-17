import { Input, ButtonGroup, Button, Box } from "@chakra-ui/react";
import React from "react";
import { NewProject } from "../../types";
import axios from "axios";
import { useSigner } from "wagmi";
import { ZeroWalletSigner } from 'zero-wallet-wagmi-connector';
import useOwnerAndWebHookAttributes from "../../hooks/useOwnerAndWebHookAttributes";

interface ProjectCreatorProps {
    onCreate: () => void;
}

export default function ProjectCreator({ onCreate }: ProjectCreatorProps) {

    const [name, setName] = React.useState<string>('');
    const [allowed_origins, setAllowedOrigins] = React.useState<string[]>([]);
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()

    const handleSubmit = async () => {

        const newProject: NewProject = {
            name,
            allowed_origins,
            ...ownerAndWebHookAttributes!,
        }
        console.table(newProject)
        await axios.post('http://localhost:3000/api/dashboard/projects', newProject);
        onCreate()
    }

    return (
        <Box>
            <Input placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Allowed Origins" value={allowed_origins} onChange={(e) => setAllowedOrigins(e.target.value.split(','))} />
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Box>
    );
}
