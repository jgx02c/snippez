import classNames from 'classnames';
import styles from './snippet.module.scss';

export interface SnippetProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Snippet = ({ className }: SnippetProps) => {
    return <div className={classNames(styles.root, className)}>Snippet</div>;
};
