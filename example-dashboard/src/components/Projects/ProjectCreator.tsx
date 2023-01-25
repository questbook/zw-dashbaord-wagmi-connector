import { Input, ButtonGroup, Button, Box } from "@chakra-ui/react";
import React from "react";
import { NewProject } from "../../types";
import axios from "axios";
import useOwnerAndWebHookAttributes from "../../hooks/useOwnerAndWebHookAttributes";

interface ProjectCreatorProps {
    onCreate: () => void;
}

export default function ProjectCreator({ onCreate }: ProjectCreatorProps) {

    const [name, setName] = React.useState<string>('');
    const [allowedOrigins, setAllowedOrigins] = React.useState<string[]>([]);
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()

    const handleSubmit = async () => {
        if (!ownerAndWebHookAttributes) return
        const newProject: NewProject = {
            name,
            allowedOrigins,
            ...ownerAndWebHookAttributes!,
        }
        await axios.post('http://localhost:3000/api/dashboard/project', newProject);
        onCreate()
    }

    return (
        <Box>
            <Input placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Allowed Origins" value={allowedOrigins} onChange={(e) => setAllowedOrigins(e.target.value.split(','))} />
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Box>
    );
}
