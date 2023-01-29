import React, { useState } from 'react';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { ProjectApiType } from '../../../types';
import InputUpdater from '../../UI/InputUpdater';
import useOwnerAndWebHookAttributes from '../../../hooks/useOwnerAndWebHookAttributes';
import axios from 'axios';
import { backendUrl } from '../../../api/constants';
import { AddIcon } from '@chakra-ui/icons';
import MultiInputUpdater from '../../UI/MultiInputUpdater';

type Props = ProjectApiType & {
    onUpdate?: () => void;
}

export default function ProjectViewer({
    project_id,
    project_api_key,
    name,
    created_at,
    owner_scw,
    allowed_origins,
    onUpdate,
}: Props) {

    const [nameUpdated, setNameUpdated] = useState(name)
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();
    const [allowOriginsUpdated, setAllowOriginsUpdated] = useState([...allowed_origins])

    const handleChangeName = (newName: string) => {
        setNameUpdated(newName.trim())
    }

    const handleSubmit = async () => {
        if (!ownerAndWebHookAttributes) return;
        await axios.post(`${backendUrl}/api/dashboard/project/${project_id}`, {
            name: nameUpdated,
            allowedOrigins: allowOriginsUpdated,
            ...ownerAndWebHookAttributes!
        })
        if (onUpdate)
            onUpdate()
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box>
                Project ID: {project_id}
                <br />
                Project API Key: {project_api_key}
                <br />
                Created At: {new Date(created_at).toTimeString()}
                <br />
                Owner SCW: {owner_scw}
                <br />
            </Box>
            <Box>
                <InputUpdater
                    handleChange={(newVal: string) => handleChangeName(newVal)}
                    value={name}
                />
            </Box>

            <br />
            Allowed Origins: {allowed_origins.join(', ')}
            <br />

            <MultiInputUpdater
                values={allowOriginsUpdated}
                onChange={(newValues: string[]) => setAllowOriginsUpdated(newValues)}
                canBeEmptyList={true}
                canAdd={true}
            />

            <Box>
                <Button
                    onClick={() => handleSubmit()}
                    isDisabled={nameUpdated === name && allowOriginsUpdated.join(',') === allowed_origins.join(',')}
                >
                    Submit
                </Button>
            </Box>

        </Flex>
    );
}