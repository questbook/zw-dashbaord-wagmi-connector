import React from 'react';
import { Box, Button, ButtonGroup, Flex, Input } from '@chakra-ui/react';
import axios from 'axios';
import useOwnerAndWebHookAttributes from '../../../hooks/useOwnerAndWebHookAttributes';
import { NewProject } from '../../../types';
import { backendUrl } from '../../../api/constants';

interface ProjectCreatorProps {
    onCreate?: () => void;
}

export default function ProjectCreator({ onCreate }: ProjectCreatorProps) {
    const [name, setName] = React.useState<string>('');
    const [allowedOrigins, setAllowedOrigins] = React.useState<string[]>([]);
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();

    const handleSubmit = async () => {
        if (!ownerAndWebHookAttributes) return;
        const newProject: NewProject = {
            name,
            allowedOrigins,
            ...ownerAndWebHookAttributes!
        };
        await axios.post(`${backendUrl}/api/dashboard/project`, newProject);
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
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Allowed Origins"
                value={allowedOrigins}
                onChange={(e) => setAllowedOrigins(e.target.value.split(','))}
            />
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Flex>
    );
}
