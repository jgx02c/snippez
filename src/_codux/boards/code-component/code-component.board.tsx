import { createBoard } from '@wixc3/react-board';
import { CodeComponent } from '../../../components/code-component/code-component';

export default createBoard({
    name: 'CodeComponent',
    Board: () => <CodeComponent />,
    isSnippet: true,
});
