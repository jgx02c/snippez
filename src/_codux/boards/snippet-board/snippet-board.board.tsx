import { createBoard } from '@wixc3/react-board';
import { SnippetBoard } from '../../../components/snippet-board/snippet-board';

export default createBoard({
    name: 'SnippetBoard',
    Board: () => <SnippetBoard onClose={function (): void {
        throw new Error('Function not implemented.');
    } } snippetID={0} snippetName={''} snippetDescription={''} snippetCode={[]} snippetWriteup={[]} snippetPicture={''} snippetDate={''} snippetSource={''} snippetNumberOfProjectsUsed={0} />,
    isSnippet: true,
});
