import classNames from 'classnames';
import styles from './quote-list.module.scss';

export interface QuoteListProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const QuoteList = ({ className }: QuoteListProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <span className={styles.spanMain}>
                <div className={styles.divUpdate}>
                    <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
                    <div className={styles.divText}>
                        <span className={styles.spanClass}>
                            <h4 className={styles.h4Class}>Heading 4</h4>
                            <a href="/" className={styles.linkClass}>Link</a></span>
                        <h6 className={styles.h6Class}>Heading 6</h6>
                    </div></div></span>
        </div>
    </div>;
};
