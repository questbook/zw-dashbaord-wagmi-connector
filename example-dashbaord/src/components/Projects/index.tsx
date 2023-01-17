
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { ProjectType } from '../../types';
import useSWR from 'swr'
import ProjectCreator from './ProjectCreator';
import Project from './project';
import useOwnerAndWebHookAttributes from '../../hooks/useOwnerAndWebHookAttributes';

const fetcher = async (input: RequestInfo | URL, init: any) => {
    console.log("init", init)
    const res = await fetch(input, init);
    return await res.json();
};


export default function Projects() {
    const ownerAndWebHookAttributes = useOwnerAndWebHookAttributes()
    // const [data, setData] = React.useState<ProjectType[]>([])
    const { data, error, mutate } = useSWR<ProjectType[]>(
        [
            'http://localhost:3000/api/dashboard/projects',
            {
                method: 'POST',
                body: {
                    ...ownerAndWebHookAttributes,
                },
            },
        ], 
        fetcher);

    // React.useEffect

    const onCreate = () => {
        mutate();
    }

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    console.log(data)

    return (
        <Flex direction="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
        >
            {data.map((project: ProjectType) => (
                <Project key={project.project_id} {...project} />
            ))}
            <ProjectCreator onCreate={onCreate} />
        </Flex>
    );
}
