import classNames from 'classnames';
import styles from './community-board.module.scss';

export interface CommunityBoardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const CommunityBoard = ({ className }: CommunityBoardProps) => {
    return <div className={classNames(styles.root, className)}>CommunityBoard</div>;
};
