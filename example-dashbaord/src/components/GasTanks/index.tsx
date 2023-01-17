
import useOwnerAndWebHookAttributes from "../../hooks/useOwnerAndWebHookAttributes";
import useSWR from 'swr'
import { GasTankType } from "../../types";
import { Flex } from "@chakra-ui/react";
import GasTank from "./GasTanks";
import GasTankCreator from "./GasTankCreator";

interface Props {
    projectId: string;
}

const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then((res) => res.json())

export default function GasTanks({ projectId }: Props) {
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()
    const { data, error, mutate } = useSWR<GasTankType[]>(
        [
            `localhost:3000/api/dashboard/projects/${projectId}/gasTanks`,
            {
                body: {
                    ...ownerAndWebHookAttributes,
                },
            },
        ],
        fetcher);

    const onCreate = () => {
        mutate();
    }

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <Flex direction="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
        >
            {data.map((project: GasTankType) => (
                <GasTank key={project.project_id} {...project} />
            ))}
            <GasTankCreator onCreate={onCreate} projectId={projectId} />
        </Flex>
    );
}

