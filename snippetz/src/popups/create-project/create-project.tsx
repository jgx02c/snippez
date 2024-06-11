import classNames from 'classnames';
import styles from './create-project.module.scss';
import React, { useState } from 'react';
import Close from '@/styles/icons/X.svg';
import Image from 'next/image';
import { createProject } from '../../../classes/controller.js'; // Adjust the import path as necessary

export interface CreateProjectProps {
    className?: string;
    onClose: () => void;
}

export const CreateProject = ({ className, onClose }: CreateProjectProps) => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState(""); // Add description state if needed

    const handleCreateProject = async () => {
        const dateCreated = new Date().toISOString();
        const newProject = {
            dateCreated,
            lastDateModified: dateCreated,
            projectName,
            projectSnippets: [],
        };

        try {
            await createProject(newProject);
            alert('Project created successfully!');
            onClose(); // Close the modal after creation
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error creating project. Please try again.');
        }
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <button onClick={onClose} className={styles.closeButton}>
                    <Image src={Close} height={24} width={24} alt="Close" />
                </button>
                <div className={styles.divLine}></div>
                <h1>Project Name</h1>
                <textarea
                    className={styles.descriptionTextArea}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <h1>Description</h1> {/* Add description field if needed */}
                <textarea
                    className={styles.descriptionTextArea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.divLine}></div>
                <button className={styles.button} onClick={handleCreateProject}>Add</button>
            </div>
        </div>
    );
};
