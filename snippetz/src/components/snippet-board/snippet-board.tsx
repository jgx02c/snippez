import classNames from 'classnames';
import styles from './snippet-board.module.scss';
import React from 'react';
import { CodeComponent, CodeComponentProps } from '../code-component/code-component';
import { WriteUpComponent, WriteUpComponentProps } from '../write-up-component/write-up-component';

export interface SnippetBoardProps {
    className?: string;
    onClose: () => void;
    snippetID: number;
    snippetName: string;
    snippetDescription: string;
    snippetCodes: snippetCode[];
    snippetWriteups: writeup[];
    snippetPicture: string;
    snippetDate: string;
    snippetSource: string;
    snippetNumberOfProjectsUsed: number;
}

export const SnippetBoard = ({ className, onClose, snippetCodes, snippetWriteups, snippetName, snippetDescription }: SnippetBoardProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <div className={styles.divTop}>
                    <h1>{snippetName}</h1>
                    <p>{snippetDescription}</p>
                </div>
                <div className={classNames(styles.divContent)}>
                    {snippetCodes.map((snippetCode, index) => (
                        <React.Fragment key={index}>
                            <div className={styles.divArray}>
                            <CodeComponent snippetCode={snippetCode} className={styles.divCode} />
                            {snippetWriteups[index] && <WriteUpComponent writeup={snippetWriteups[index]} />}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.divExtra}></div>
            </div>
        </div>
    );
};
