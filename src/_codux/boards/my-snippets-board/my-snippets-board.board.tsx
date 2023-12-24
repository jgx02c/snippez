import { createBoard } from '@wixc3/react-board';
import { MySnippetsBoard } from '../../../components/my-snippets-board/my-snippets-board';

export default createBoard({
    name: 'MySnippetsBoard',
    Board: () => <MySnippetsBoard />,
    isSnippet: true,
});
