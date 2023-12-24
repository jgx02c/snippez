import { createBoard } from '@wixc3/react-board';
import { ProjectsBoard } from '../../../components/projects-board/projects-board';

export default createBoard({
    name: 'ProjectsBoard',
    Board: () => <ProjectsBoard />,
    isSnippet: true,
});
