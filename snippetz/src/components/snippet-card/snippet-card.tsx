import classNames from 'classnames';
import styles from './snippet-card.module.scss';
import Image from 'next/image'

export interface SnippetCardProps {
    className?: string;
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

export const SnippetCard = ({ className, snippetName, snippetDescription, lastDateModified }: SnippetCardProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>   
            <div>
                <h1 className={styles.h1Class}>{snippetName}</h1>
                <p className={styles.paragraphClass}>{snippetDescription} </p>
            </div>
                <h6 className={styles.h6Class}>Last Modified: {lastDateModified}</h6>
        </div>
    </div>;
};
