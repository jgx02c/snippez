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
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <span className={styles.mainSpan}>
                <span className={styles.spanCardlet}>
                    <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
                    <div className={styles.divText}>
                        <h4>Heading 4</h4>
                        <h4>Heading 4</h4>
                    </div></span>
                <div className={styles.divLine} />
                <span className={styles.spanCardlet}>
                    <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
                    <div className={styles.divText}>
                        <h4>Heading 4</h4>
                        <h4>Heading 4</h4>
                    </div></span>
                <div className={styles.divLine}></div>
                <span className={styles.spanCardlet}>
                    <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
                    <div className={styles.divText}>
                        <h4>Heading 4</h4>
                        <h4>Heading 4</h4>
                    </div></span>
                <div className={styles.divLine}></div>
                <span className={styles.spanCardlet}>
                    <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
                    <div className={styles.divText}>
                        <h4>Heading 4</h4>
                        <h4>Heading 4</h4>
                    </div></span>
            </span>
        </div></div>;
};
