import classNames from 'classnames';
import styles from './all-snippets.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';

import { SnippetCard } from '../snippet-card/snippet-card';
import { SnippetBoard } from '../snippet-board/snippet-board';

interface SnippetType {
  snippetID: number;
  typeID: string;
  snippetName: string;
  snippetDescription: string;
  snippetCodes: string[];
  snippetWriteups: string[];
  snippetPicture: string;
  snippetDate: string;
  snippetSource: string;
  snippetNumberOfProjectsUsed: number;
}

export interface MySnippetsBoardProps {
  className?: string;
}

export const AllSnippets = ({ className }: MySnippetsBoardProps) => {
    const id = 0;
    const filter = "none";

    const [snippets, setSnippets] = useState<SnippetType[] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [selectedSnippetID, setSelectedSnippetID] = useState<number | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const responseData: SnippetType[] = await controller.getSnippets(id);
                setSnippets(responseData);
                console.log("response", responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
            }
        };

        fetchProject();
    }, []);

    const handleSnippetCardClick = (snippetID: number) => {
        setSelectedSnippetID(snippetID);
    };

    const chunkSize = 3; // Number of child components in each row

    // Check if snippets is defined before mapping over it
    if (snippets === undefined) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

    // Chunk the data array into arrays of size chunkSize
    const chunkedData = Array.from({ length: Math.ceil(snippets.length / chunkSize) }, (_, index) =>
        snippets.slice(index * chunkSize, (index + 1) * chunkSize)
    );

    return (
        <div className={classNames(styles.root, className)}>
            {selectedSnippetID ? (
                // Pass the details of the selected snippet to SnippetBoard
                <SnippetBoard
                typeID={''}
            snippetName={''} snippetDescription={''} snippetCodes={[]} snippetWriteups={[]} snippetPicture={''} snippetDate={''} snippetSource={''} snippetNumberOfProjectsUsed={0} snippetID={selectedSnippetID}
            onClose={() => setSelectedSnippetID(null)}
            {...snippets.find(snippet => snippet.snippetID === selectedSnippetID)}                />
            ) : (
                <>

                    {chunkedData.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.row}>
                            {row.map((snippet, colIndex) => (
                                <div key={colIndex} className={styles.parentItem} onClick={() => handleSnippetCardClick(snippet.snippetID)}>
                                    <SnippetCard
                                        key={snippet.snippetID}
                                        snippetID={snippet.snippetID}
                                        typeID={snippet.typeID}
                                        snippetDate={snippet.snippetDate}
                                        snippetName={snippet.snippetName}
                                        snippetDescription={snippet.snippetDescription}
                                        snippetCode={snippet.snippetCodes}
                                        snippetWriteup={snippet.snippetWriteups}
                                        snippetPicture={snippet.snippetPicture}
                                        snippetSource={snippet.snippetSource}
                                        snippetNumberOfProjectsUsed={snippet.snippetNumberOfProjectsUsed}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
