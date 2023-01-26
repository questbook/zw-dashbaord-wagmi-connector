import { IBase, IGasTank, IProject, ProjectApiType } from '../types';
import { postFetcher } from '../utils/fetchers';
import { backendUrl } from './constants';

export async function getProjects(
    ownerAndWebHookAttributes: IBase
): Promise<IProject[]> {
    const getRawProjectsUrl = `${backendUrl}/api/dashboard/projects`;
    const projects = await postFetcher<ProjectApiType[]>([
        getRawProjectsUrl,
        ownerAndWebHookAttributes
    ]);
    if (projects === null) {
        throw new Error('No projects found');
    }

    const projectWithGasTanks = await Promise.all(
        projects.map(async (project) => {
            const getGasTanksUrl = `${backendUrl}/api/dashboard/project/${project.project_id}/gasTanks`;
            const gasTanks = await postFetcher<IGasTank[]>([
                getGasTanksUrl,
                ownerAndWebHookAttributes
            ]);
            if (gasTanks === null)
                throw new Error(
                    `No gas tanks found for project ${project.name}`
                );
            return { ...project, gasTanks };
        })
    );
    console.log(projectWithGasTanks);
    return projectWithGasTanks;
}
