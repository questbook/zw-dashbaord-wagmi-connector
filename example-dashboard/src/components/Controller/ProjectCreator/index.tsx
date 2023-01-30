import React from 'react';
import { Box, Button, ButtonGroup, Flex, Input } from '@chakra-ui/react';
import axios from 'axios';
import useOwnerAndWebHookAttributes from '../../../hooks/useOwnerAndWebHookAttributes';
import { NewProject } from '../../../types';
import { backendUrl } from '../../../api/constants';
import InputUpdater from '../../UI/InputUpdater';
import MultiInputUpdater from '../../UI/MultiInputUpdater';

interface ProjectCreatorProps {
    onCreate?: () => void;
}

const ORIGIN_PLACEHOLDER = 'https://example.com';
const NAME_PLACEHOLDER = 'MY PROJECT';

export default function ProjectCreator({ onCreate }: ProjectCreatorProps) {
    const [name, setName] = React.useState<string>(NAME_PLACEHOLDER);
    const [allowedOrigins, setAllowedOrigins] = React.useState<string[]>([ORIGIN_PLACEHOLDER]);
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
            gap={2}
        >
            Project name
            <InputUpdater
                value={name}
                handleChange={(newName) => setName(newName)}
            />

            Allowed origins
            <MultiInputUpdater 
                values={allowedOrigins}
                onChange={(newValues: string[]) => setAllowedOrigins(newValues)}
                canAdd={true}
                defaultNewValue={ORIGIN_PLACEHOLDER}
            />
            <ButtonGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </ButtonGroup>
        </Flex>
    );
}
