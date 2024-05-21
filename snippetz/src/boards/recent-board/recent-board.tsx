import classNames from 'classnames';
import styles from './recent-board.module.scss';
import { AllSnippets } from '../all-snippets/all-snippets';

export interface RecentBoardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const RecentBoard = ({ className }: RecentBoardProps) => {



    
    

    

    return (
         <div className={classNames(styles.root, className)}>
                <div className={styles.divMain}>
                        <span className={styles.spanMain}>
                            <div className={styles.divText}>
                                <h1>Recents</h1>
                            </div>
                        </span>
                    </div>
            <AllSnippets />
    </div>
    );
};
