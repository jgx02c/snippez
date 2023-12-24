import { createBoard } from '@wixc3/react-board';
import { RecentProjects } from '../../../components/recent-projects/recent-projects';

export default createBoard({
    name: 'RecentProjects',
    Board: () => <RecentProjects />,
    isSnippet: true,
});
