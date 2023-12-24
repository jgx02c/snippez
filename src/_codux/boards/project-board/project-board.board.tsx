import { createBoard } from '@wixc3/react-board';
import { ProjectBoard } from '../../../components/project-board/project-board';

export default createBoard({
    name: 'ProjectBoard',
    Board: () => <ProjectBoard />,
    isSnippet: true,
});
