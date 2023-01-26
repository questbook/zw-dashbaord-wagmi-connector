import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ProjectApiType } from '../../../types';

export default function ProjectViewer({
    project_id,
    project_api_key,
    name,
    created_at,
    owner_scw,
    allowed_origins
}: ProjectApiType) {
    return (
        <Flex>
            Project ID: {project_id}
            <br />
            Project API Key: {project_api_key}
            <br />
            Name: {name}
            <br />
            Created At: {new Date(created_at).toTimeString()}
            <br />
            Owner SCW: {owner_scw}
            <br />
            Allowed Origins: {allowed_origins.join(', ')}
        </Flex>
    );
}
