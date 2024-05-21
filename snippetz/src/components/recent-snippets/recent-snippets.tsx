import classNames from 'classnames';
import styles from './recent-snippets.module.scss';

export interface RecentSnippetsProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const RecentSnippets = ({ className }: RecentSnippetsProps) => {
    return <div className={classNames(styles.root, className)}>RecentSnippets</div>;
};
