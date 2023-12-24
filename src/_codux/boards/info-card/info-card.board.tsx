import { createBoard } from '@wixc3/react-board';
import { InfoCard } from '../../../components/info-card/info-card';

export default createBoard({
    name: 'InfoCard',
    Board: () => <InfoCard />,
    isSnippet: true,
});
