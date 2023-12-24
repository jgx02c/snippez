import { createBoard } from '@wixc3/react-board';
import { Snippet } from '../../../components/snippet/snippet';

export default createBoard({
    name: 'Snippet',
    Board: () => <Snippet />,
    isSnippet: true,
});
