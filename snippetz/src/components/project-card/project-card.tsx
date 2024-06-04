import classNames from 'classnames';
import styles from './project-card.module.scss';
import React from 'react';

export interface project {
    className?: string;
    projectID: number;
    dateCreated: string;
    lastDateModified: string;
    projectName: string;
    projectSnippets: {
        language: string;
        snippets: string[];
      }[]
}

export const ProjectCard = ({ className, projectName, projectID, dateCreated, lastDateModified, projectSnippets}: project) => {


    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <div className={styles.divTop}>
                <span className={styles.spanTop}>

                    <div id="menu-wrap" className={styles.divLeft}>
                        
                        <h4 className={styles.titleClass}>{projectName}</h4></div></span>
            </div>
            <div className={styles.divBottom}>
                <span className={styles.spanBottom}>
                    <div className={styles.divSpanBottom_Top}>
                        <span className={styles.spanBottom_TextTop}>
                            <h6 className={styles.h6Class}>Last Updated</h6>
                            <h5 className={styles.h5Class}>{lastDateModified}</h5>
                        </span>
                        <span className={styles.spanBottom_TextTop}>
                            <h6 className={styles.h6Class}>Snippets Count: </h6>
                            <h5 className={styles.h5Class}>{projectSnippets.length}</h5>
                        </span>
                    </div>
                    <div className={styles.divSpanBottom_Bottom}></div>
                </span>
            </div>
        </div>
    </div>;
};
