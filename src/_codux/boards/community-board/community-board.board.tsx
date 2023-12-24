import { createBoard } from '@wixc3/react-board';
import { CommunityBoard } from '../../../components/community-board/community-board';

export default createBoard({
    name: 'CommunityBoard',
    Board: () => <CommunityBoard />,
    isSnippet: true,
});
