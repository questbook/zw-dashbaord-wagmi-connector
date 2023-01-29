import React, { useState } from 'react';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { ProjectApiType } from '../../../types';
import InputUpdater from '../../UI/InputUpdater';
import useOwnerAndWebHookAttributes from '../../../hooks/useOwnerAndWebHookAttributes';
import axios from 'axios';
import { backendUrl } from '../../../api/constants';
import { AddIcon } from '@chakra-ui/icons';

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

    const handleRemove = (index: number) => {
        const newAllowOriginsUpdated = allowOriginsUpdated.filter((_, curIndex) => curIndex !== index);
        setAllowOriginsUpdated(newAllowOriginsUpdated)
    }

    const handleChange = (index: number, newVal: string) => {
        const newAllowOriginsUpdated = [...allowOriginsUpdated];
        newAllowOriginsUpdated[index] = newVal.trim();
        setAllowOriginsUpdated(newAllowOriginsUpdated)
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

    const handleAddOrigin = () => {
        setAllowOriginsUpdated([...allowOriginsUpdated, ''])
    }

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
            <Box>
                {
                    allowed_origins.map((origin, index) => {
                        return (
                            <InputUpdater
                                handleChange={(newVal: string) => handleChange(index, newVal)}
                                handleRemove={() => handleRemove(index)}
                                value={origin}
                                key={index}
                            />
                        )
                    })
                }
            </Box>

            <IconButton
                onClick={handleAddOrigin}
                icon={<AddIcon />}
                aria-label={''}
                m={10}
            >
            </IconButton>

            <Box>
                <Button
                    disabled={nameUpdated === name && allowOriginsUpdated.join(',') === allowed_origins.join(',')}
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
            </Box>

        </Flex>
    );
}