import { createBoard } from '@wixc3/react-board';
import { HomeBoard } from '../../../components/home-board/home-board';

export default createBoard({
    name: 'HomeBoard',
    Board: () => <HomeBoard />,
    isSnippet: true,
});
