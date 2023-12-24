import { createBoard } from '@wixc3/react-board';
import { SettingsBoard } from '../../../components/settings-board/settings-board';

export default createBoard({
    name: 'SettingsBoard',
    Board: () => <SettingsBoard />,
    isSnippet: true,
});
