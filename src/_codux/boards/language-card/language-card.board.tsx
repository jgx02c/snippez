import { createBoard } from '@wixc3/react-board';
import { LanguageCard } from '../../../components/language-card/language-card';

export default createBoard({
    name: 'LanguageCard',
    Board: () => <LanguageCard />,
    isSnippet: true,
});
