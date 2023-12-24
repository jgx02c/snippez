import { createBoard } from '@wixc3/react-board';
import { SideBarLeft } from '../../../components/side-bar-left/side-bar-left';

export default createBoard({
    name: 'SideBarLeft',
    Board: () => <SideBarLeft />,
    isSnippet: true,
});
