import classNames from 'classnames';
import styles from './create-snippet-board.module.scss';
import react from 'react';

export interface CreateSnippetBoardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const CreateSnippetBoard = ({ className }: CreateSnippetBoardProps) => {
    return <div className={classNames(styles.root, className)}>CreateSnippetBoard</div>;
};
