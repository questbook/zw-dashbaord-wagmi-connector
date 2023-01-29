import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { ProjectsContext } from '../../../pages/_app';
import ProjectViewer from './ProjectViewer';
import { useAccount, useConnect } from 'wagmi';
import ProjectCreator from './ProjectCreator';
import GasTankCreator from './GasTankCreator';
import GasTankViewer from './GasTankViewer';

interface Props {
    updateProjects?: () => void;
}

export default function SmartViewer({ updateProjects }: Props) {
    const { isConnected } = useAccount();
    const { selectedEntity, doesScwExist } = useContext(ProjectsContext)!;

    if (!doesScwExist && isConnected) return <Box>Deploying SCW...</Box>;
    if (!doesScwExist || !selectedEntity) return null;

    if ('gasTanks' in selectedEntity) {
        return <ProjectViewer onUpdate={updateProjects} {...selectedEntity} />;
    }

    if ('createNew' in selectedEntity) {
        if (selectedEntity.createNew === 'project')
            return <ProjectCreator onCreate={updateProjects} />;
        if (selectedEntity.createNew === 'gasTank')
            return (
                <GasTankCreator
                    projectId={selectedEntity.projectId}
                    onCreate={updateProjects}
                />
            );
    }

    return <GasTankViewer {...selectedEntity} />;
}
