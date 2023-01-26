import { Flex } from '@chakra-ui/react';
import useSWR from 'swr';
import useOwnerAndWebHookAttributes from '../../hooks/useOwnerAndWebHookAttributes';
import { GasTankType } from '../../types';
import { postFetcher } from '../../utils/fetchers';
import GasTankCreator from './GasTankCreator';
import GasTank from './GasTanks';

interface Props {
    projectId: string;
}

export default function GasTanks({ projectId }: Props) {
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes();
    const { data, error, mutate } = useSWR<GasTankType[]>(
        [
            `localhost:3000/api/dashboard/projects/${projectId}/gasTanks`,
            ownerAndWebHookAttributes
        ],
        postFetcher
    );

    const onCreate = () => {
        mutate();
    };

    if (!ownerAndWebHookAttributes) return <div>loading...</div>;
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <Flex
            direction="column"
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
