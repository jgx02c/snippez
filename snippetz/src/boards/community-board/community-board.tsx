import classNames from 'classnames';
import styles from './community-board.module.scss';

export interface CommunityBoardProps {
    className?: string;
}

export const CommunityBoard = ({ className }: CommunityBoardProps) => {
    return (
    <div className={classNames(styles.root, className)}>
         <div className={styles.divMain}>
                        <span className={styles.spanMain}>
                            <div className={styles.divText}>
                                <h1>Community</h1>
                            </div>
                            <div className={styles.divButtons}>
                                <select><option>Language</option><option>Recent</option><option>Created</option></select>
                                <button>Search</button>
                                <button>View</button>
                            </div>
                        </span>
                    </div>

        </div>

    );
};
