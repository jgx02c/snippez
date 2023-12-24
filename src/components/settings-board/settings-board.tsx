import classNames from 'classnames';
import styles from './settings-board.module.scss';

export interface SettingsBoardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SettingsBoard = ({ className }: SettingsBoardProps) => {
    return <div className={classNames(styles.root, className)}>SettingsBoard</div>;
};
