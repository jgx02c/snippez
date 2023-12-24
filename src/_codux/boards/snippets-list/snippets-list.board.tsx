import { createBoard } from '@wixc3/react-board';
import { SnippetsList } from '../../../components/snippets-list/snippets-list';

export default createBoard({
    name: 'SnippetsList',
    Board: () => <SnippetsList />,
    isSnippet: true,
});
