import classNames from 'classnames';
import styles from './top-bar.module.scss';

export interface TopBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const TopBar = ({ className }: TopBarProps) => {
    return <div className={classNames(styles.root, className)}>
        <div>
            <span>text</span>
        </div>
    </div>;
};
