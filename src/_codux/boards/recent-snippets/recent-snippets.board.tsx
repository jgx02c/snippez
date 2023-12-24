import { createBoard } from '@wixc3/react-board';
import { RecentSnippets } from '../../../components/recent-snippets/recent-snippets';

export default createBoard({
    name: 'RecentSnippets',
    Board: () => <RecentSnippets />,
    isSnippet: true,
});
