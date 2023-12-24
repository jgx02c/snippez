import { createBoard } from '@wixc3/react-board';
import { SnippetCard } from '../../../components/snippet-card/snippet-card';

export default createBoard({
    name: 'SnippetCard',
    Board: () => <SnippetCard />,
    isSnippet: true,
});
