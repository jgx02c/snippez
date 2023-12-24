import classNames from 'classnames';
import styles from './info-card.module.scss';

export interface InfoCardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const InfoCard = ({ className }: InfoCardProps) => {
    return <div className={classNames(styles.root, className)}>InfoCard</div>;
};
