import classNames from 'classnames';
import styles from './side-bar-left.module.scss';

export interface SideBarLeftProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SideBarLeft = ({ className }: SideBarLeftProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <div className={styles.divImg}>
                <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
            </div>
            <div className={styles.divButtons}>
                <button className={styles.buttonClass}>Home</button>
                <button className={styles.buttonClass}>Projects</button>
                <button className={styles.buttonClass}>Recents</button>
                <button className={styles.buttonClass}>Community</button>
                <button className={styles.buttonClass}>My Snippets</button>
                <button className={styles.buttonClass}>Settings</button>
            </div>
        </div>
    </div>;
};
