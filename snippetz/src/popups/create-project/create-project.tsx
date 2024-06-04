import classNames from 'classnames';
import styles from './create-project.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import IconDropdownMenu from '@/components/icon-menu/iconmenu';
import Close from '@/styles/icons/X.svg'
import Image from 'next/image'

export interface InsightExpandedProps {
    className?: string;
    onClose: () => void;
}

export const CreateProject = ({ className, onClose }: InsightExpandedProps) => {

    const [open, setOpen] = useState(false);
    const [projectName, setProjectName] = useState("");

    const handleDropdownToggle = () => {
        setOpen(!open);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <button onClick={onClose} className={styles.closeButton}><Image src={Close} height={24} width={24} alt="Close" ></Image></button>
                <div className={styles.divLine}></div>
                <h1>Project Name</h1>
                <textarea
                            className={styles.descriptionTextArea}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                <h1>Project Icon</h1>
                  <div className={styles.divIcon}>
                    <button className={styles.iconButtonClass} onClick={handleDropdownToggle}>Select Icon</button>
                    {open && (
                        <div className={styles.dropdownMenu}>
                            <IconDropdownMenu onSelectIcon={function (icon: string): void {
                                throw new Error('Function not implemented.');
                            }} />
                        </div>
                    )}
                </div>
                <div className={styles.divLine}></div>
                        <button className={styles.button}>Add</button>
            </div>
        </div>
    );
};