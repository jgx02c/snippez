import classNames from 'classnames';
import styles from './snippets-list.module.scss';

export interface SnippetsListProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SnippetsList = ({ className }: SnippetsListProps) => {
    return <div className={classNames(styles.root, className)}>SnippetsList</div>;
};
