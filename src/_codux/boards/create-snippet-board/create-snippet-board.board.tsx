import { createBoard } from '@wixc3/react-board';
import { CreateSnippetBoard } from '../../../components/create-snippet-board/create-snippet-board';

export default createBoard({
    name: 'CreateSnippetBoard',
    Board: () => <CreateSnippetBoard />,
    isSnippet: true,
});
