import { createBoard } from '@wixc3/react-board';
import { ProjectCard } from '../../../components/project-card/project-card';

export default createBoard({
    name: 'ProjectCard',
    Board: () => <ProjectCard />,
    isSnippet: true,
});
