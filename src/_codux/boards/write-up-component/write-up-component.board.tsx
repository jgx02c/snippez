import { createBoard } from '@wixc3/react-board';
import { WriteUpComponent } from '../../../components/write-up-component/write-up-component';

export default createBoard({
    name: 'WriteUpComponent',
    Board: () => <WriteUpComponent />,
    isSnippet: true,
});
