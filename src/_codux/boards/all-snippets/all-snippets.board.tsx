import { createBoard } from '@wixc3/react-board';
import { AllSnippets } from '../../../components/all-snippets/all-snippets';

export default createBoard({
    name: 'AllSnippets',
    Board: () => <AllSnippets />,
    isSnippet: true,
});
