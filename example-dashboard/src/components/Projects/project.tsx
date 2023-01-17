
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ProjectType } from '../../types';

export default function Project(props: ProjectType) {
    const router = useRouter();

    const handleOnClick = () => router.push(`/project/${props.project_id}`);

    return (
        <Box onClick={handleOnClick}>
            {JSON.stringify(props, null, 2)}
        </Box>
    )
}
