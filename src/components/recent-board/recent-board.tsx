import classNames from 'classnames';
import styles from './recent-board.module.scss';

export interface RecentBoardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const RecentBoard = ({ className }: RecentBoardProps) => {
    return <div className={classNames(styles.root, className)}>RecentBoard</div>;
};
