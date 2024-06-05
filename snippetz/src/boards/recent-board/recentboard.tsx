import classNames from 'classnames';
import styles from './receantboard.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { SnippetBoard } from '../snippet-board/snippet-board';
import { SnippetCard } from '@/components/snippet-card/snippet-card';
import { SnippetType } from '@/types/types';

export interface SnippetsBoardProps {
  className?: string;
}

export const RecentBoard: React.FC<SnippetsBoardProps> = ({ className }: SnippetsBoardProps) => {
  
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetType | null>(null);
  const [isCreateSnippetClicked, setCreateSnippetClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const responseData: SnippetType[] = await controller.getRecentSnippets();
        if (Array.isArray(responseData)) {
          setSnippets(responseData);
        } else {
          console.error('Response is not an array:', responseData);
          setError('Error fetching data. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };

    fetchSnippets();
  }, []);

  const handleSnippetCardClick = (snippet: SnippetType) => {
    setSelectedSnippet(snippet);
  };

  if (snippets === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(styles.root, className)}>
      {selectedSnippet ? (
        <SnippetBoard
          onClose={() => setSelectedSnippet(null)}
          snippetID={selectedSnippet.snippetID} 
          dateCreated={selectedSnippet.dateCreated} 
          lastDateModified={selectedSnippet.lastDateModified} 
          programmingLanguage={selectedSnippet.programmingLanguage} 
          codeArray={selectedSnippet.codeArray} 
          writeUp={selectedSnippet.writeUp} 
          snippetDescription={selectedSnippet.snippetDescription} 
          snippetSource={selectedSnippet.snippetSource} 
          snippetSourceLinks={selectedSnippet.snippetSourceLinks} 
          snippetName={selectedSnippet.snippetName}   
        />
         
      ) : (
        <>
        <div className={styles.top}>
     <span className={styles.spanTop}>
     <div className={styles.left}>
       <h1 className={styles.h1Class}>Recent Snippets</h1>
     </div>
   </span>
   </div>
  
        <div className={styles.content}>
          {snippets.map((snippet, index) => (
            <div key={index} className={styles.parentItem} onClick={() => handleSnippetCardClick(snippet)}>
              <SnippetCard
                snippetID={snippet.snippetID}
                dateCreated={snippet.dateCreated}
                lastDateModified={snippet.lastDateModified}
                programmingLanguage={snippet.programmingLanguage}
                codeArray={snippet.codeArray}
                writeUp={snippet.writeUp}
                snippetDescription={snippet.snippetDescription}
                snippetSource={snippet.snippetSource}
                snippetSourceLinks={snippet.snippetSourceLinks}
                snippetName={snippet.snippetName}
              />
            </div>
          ))}
          {isCreateSnippetClicked && (
            <div className={styles.modalOverlay}>
              {/* Add your modal component for creating a new snippet here */}
            </div>
          )}
        </div>
        </>
      )}
    </div>
  );
};
