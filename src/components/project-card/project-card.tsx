import classNames from 'classnames';
import styles from './project-card.module.scss';
import React from 'react';

export interface project {
    className?: string;
    projectID: number;
    userID: number;
    status: string;
    collaboration: boolean;
    collaborationID: number;
    uploadDate: string;
    projectDueDate: string;
    projectName: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ProjectCard = ({ className, projectName, projectDueDate, uploadDate }: project) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.divMain}>
            <div className={styles.divTop}>
                <span className={styles.spanTop}>

                    <div id="menu-wrap" className={styles.divLeft}>
                        <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgLogo} />
                        <h4 className={styles.titleClass}>{projectName}</h4></div>
                    <div id="menu-wrap" className={styles.divRight}>
                        <select><option>Apple</option><option>Banana</option><option>Watermelon</option></select>
                    </div>
                </span>
            </div>
            <div className={styles.divMiddle}>
                <span className={styles.spanMiddle}>
                    <div className={styles.divLeftMiddle}>
                        <select><option>Apple</option><option>Banana</option><option>Watermelon</option></select>
                    </div>
                    <div className={styles.divRightMiddle}>
                        <span className={styles.spanPeople}>
                            <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgPerson} />
                        </span>
                    </div>
                </span>
            </div>
            <div className={styles.divBottom}>
                <span className={styles.spanBottom}>
                    <div className={styles.divSpanBottom_Top}>
                        <span className={styles.spanBottom_TextTop}>
                            <h6 className={styles.h6Class}>Last Updated</h6>
                            <h5 className={styles.h5Class}>{uploadDate}</h5>
                        </span>
                    </div>
                    <div className={styles.divSpanBottom_Bottom}>
                        <span className={styles.spanBottom_TextBottom}>
                            <h5 className={styles.h5Class}>Due</h5>
                            <h6 className={styles.h6Class}>{projectDueDate}</h6>
                            <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgDue} /></span>
                    </div>
                </span>
            </div>
        </div>
    </div>;
};
