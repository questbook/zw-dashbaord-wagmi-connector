import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import GasTanks from '../../src/components/GasTanks';

export default function ProjectPage() {
    const router = useRouter();
    const { id: projectId } = router.query;

    if (typeof projectId !== 'string') return <div>loading...</div>;

    return (
        <Box>
            {projectId}
            <GasTanks projectId={projectId} />
        </Box>
    );
}
