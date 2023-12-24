import classNames from 'classnames';
import styles from './project-board.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js'; // Import your controller module
import { SnippetCard } from '../snippet-card/snippet-card';

export interface ProjectBoardProps {
    className?: string;
    onClose: () => void;
    projectID: number;
}

interface SnippetType {
    languageID: string;
    // Add other properties specific to SnippetType
}

export const ProjectBoard: React.FC<ProjectBoardProps> = ({ className, onClose, projectID }: ProjectBoardProps) => {

    const id = 1;

    const [snippets, setSnippets] = useState<SnippetType[] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const responseData: SnippetType[] = await controller.getSnippets(id);
                setSnippets(responseData);
                console.log("response", responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
            }
        };

        fetchSnippets();
    }, [projectID]);

    // Group snippets by languageID
    const groupedSnippets: { [key: string]: SnippetType[] } = {};
    if (snippets) {
        snippets.forEach((snippet) => {
            const languageID = snippet.languageID;
            if (!groupedSnippets[languageID]) {
                groupedSnippets[languageID] = [];
            }
            groupedSnippets[languageID].push(snippet);
        });
    }

    return (
        <div className={classNames(styles.root, className)}>
            {/* ... (rest of your ProjectBoard component) */}
            <div className={styles.divTopContent}>
                <span className={classNames(styles.spanContent, styles.spanMain)}>
                    <h1>Snippets</h1>
                    <button>Button</button>
                </span>
            </div>
            <div className={styles.feedback}>
                {error && <div>Error: {error}</div>}
                {groupedSnippets !== undefined ? (
                    Object.entries(groupedSnippets).map(([languageID, snippetsOfType]) => (
                        <div key={languageID}>
                            <h2>{languageID} Snippets</h2>
                            <div className="carousel-container">
                                <span className="carousel">
                                    {snippetsOfType.map((snippet, index) => (
                                        <div key={index} className="carousel-item">
                                            <SnippetCard languageID={snippet.languageID} />
                                        </div>
                                    ))}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};
