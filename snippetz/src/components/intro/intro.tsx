import classNames from 'classnames';
import styles from './intro.module.scss';

export interface IntroProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Intro = ({ className }: IntroProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.background} />
            <div className={styles.divfilter}>
                <span className={styles.spanCenter}>
                    <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgCenter} />
                </span>
            </div>
        </div>
    </div>;
};
