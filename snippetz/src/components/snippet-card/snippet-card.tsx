import classNames from 'classnames';
import styles from './snippet-card.module.scss';
import Image from 'next/image'

export interface SnippetCardProps {
    className?: string;
    snippetID: number;
    dateCreated: string;
    lastDateModified: string;
    programmingLanguage: string;
    codeArray: string[];
    writeUp: string[];
    snippetDescription: string;
    snippetSource: string;
    snippetSourceLinks: string[];
    snippetName: string;
}

export const SnippetCard = ({ className, snippetID, snippetName, snippetDescription }: SnippetCardProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <span className={styles.spanClass}><div className={styles.divLeft}>
                
                </div>
                <div className={styles.divRight}>
                    <h1 className={styles.h1Class}>{snippetName}</h1>
                    <p className={styles.paragraphClass}>{snippetDescription} </p>
                </div>
            </span>
        </div>
    </div>;
};
