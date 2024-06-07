import classNames from 'classnames';
import styles from './createlanguage.module.scss';
import React, { useState } from 'react';
import IconDropdownMenu from '@/components/icon-menu/iconmenu';
import Close from '@/styles/icons/X.svg';
import Image from 'next/image';
import { createLanguage } from '../../../classes/controller.js'; // Adjust the import path as necessary

export interface InsightExpandedProps {
    className?: string;
    onClose: () => void;
}

export const CreateLanguage: React.FC<InsightExpandedProps> = ({ className, onClose }) => {
    const [open, setOpen] = useState(false);
    const [languageName, setLanguageName] = useState("");
    const [languageIcon, setLanguageIcon] = useState("");

    const handleDropdownToggle = () => {
        setOpen(!open);
    };

    const handleIconSelect = (icon: string) => {
        setLanguageIcon(icon); // Set only the src property
        setOpen(false);
    };

    const handleAddLanguage = async () => {
        const languageID = new Date().getTime(); // Use current date and time as ID
        const languageSnippetCount = 0;

        const newLanguage = {
            languageID,
            languageName,
            languageIcon, // Use the selected icon
            languageSnippetCount
        };

        try {
            await createLanguage(newLanguage);
            onClose(); // Close the modal after successful creation
        } catch (error) {
            console.error('Error creating language:', error);
            alert('An error occurred while creating the language');
        }
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <button onClick={onClose} className={styles.closeButton}>
                    <Image src={Close} height={24} width={24} alt="Close" />
                </button>
                <div className={styles.divLine}></div>
                <h1>Language Name</h1>
                <textarea
                    className={styles.descriptionTextArea}
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                />
                <h1>Language Icon</h1>
                <div className={styles.divIcon}>
                    <button className={styles.iconButtonClass} onClick={handleDropdownToggle}>Select Icon</button>
                    {open && (
                        <div className={styles.dropdownMenu}>
                            <IconDropdownMenu onSelectIcon={handleIconSelect} />
                        </div>
                    )}
                </div>
                <div className={styles.divLine}></div>
                <button className={styles.button} onClick={handleAddLanguage}>Add</button>
            </div>
        </div>
    );
};
