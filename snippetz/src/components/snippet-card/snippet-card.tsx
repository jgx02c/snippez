import classNames from 'classnames';
import styles from './snippet-card.module.scss';

export interface SnippetCardProps {
    className?: string;
    snippetID: number;
    typeID: string;
    snippetName: string;
    snippetDescription: string;
    snippetCode: string[];
    snippetWriteup: string[];
    snippetPicture: string;
    snippetDate: string;
    snippetSource: string;
    snippetNumberOfProjectsUsed: number;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SnippetCard = ({ className, typeID, snippetSource }: SnippetCardProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <span className={styles.spanClass}><div className={styles.divLeft}>
                <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
                <h3 className={styles.h3Class}>{typeID}</h3>
                <h3 className={styles.h3Class}>{snippetSource}</h3></div>
                <div className={styles.divRight}>
                    <h1 className={styles.h1Class}>Title</h1>
                    <p className={styles.paragraphClass}>Summary </p>
                </div>
            </span>
        </div>
    </div>;
};
