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
        <h1 className={styles.titleClass}>{projectName}</h1>
        <h6 className={styles.h6Class}>{lastDateModified}</h6>
      </div>
    </div>;
};
