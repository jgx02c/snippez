import { createBoard } from '@wixc3/react-board';
import { RecentBoard } from '../../../components/recent-board/recent-board';

export default createBoard({
    name: 'RecentBoard',
    Board: () => <RecentBoard />,
    isSnippet: true,
});
