import classNames from 'classnames';
import styles from './feed-list.module.scss';

export interface FeedListProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const FeedList = ({ className }: FeedListProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <span className={styles.spanMain}>
                <div>
                    <h2>Heading 2</h2>
                </div>
                <div>
                    <input />
                    <button>Button</button></div></span>
        </div>
    </div>;
};
