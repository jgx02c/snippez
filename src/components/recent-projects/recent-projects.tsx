import classNames from 'classnames';
import styles from './recent-projects.module.scss';

export interface RecentProjectsProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const RecentProjects = ({ className }: RecentProjectsProps) => {
    return <div className={classNames(styles.root, className)}>RecentProjects</div>;
};
