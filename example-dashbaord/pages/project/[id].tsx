import { useRouter } from "next/router"
import GasTanks from "../../src/components/GasTanks";
import { Box } from "@chakra-ui/react";

export default function ProjectPage() {
    const router = useRouter();
    const { id: projectId } = router.query;

    if (typeof projectId !== 'string') return (<div>loading...</div>)

    return (
        <Box>
            {projectId}
            <GasTanks projectId={projectId} />
        </Box>
    )
}
