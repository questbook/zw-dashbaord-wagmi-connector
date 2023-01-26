import React from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ProjectApiType } from '../../types';

export default function Project(props: ProjectApiType) {
    const router = useRouter();

    const handleOnClick = () => router.push(`/project/${props.project_id}`);

    return <Box onClick={handleOnClick}>{JSON.stringify(props, null, 2)}</Box>;
}
