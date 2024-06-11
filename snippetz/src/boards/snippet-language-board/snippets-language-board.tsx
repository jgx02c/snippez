import classNames from 'classnames';
import styles from './snippets-language-board.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { CreateSnippet} from '@/popups/create-snippet/create-snippet';
import { SnippetBoard } from '../snippet-board/snippet-board';
import { SnippetCard } from '@/components/snippet-card/snippet-card';
import { SnippetType } from '@/types/types';

export interface SnippetsSnippetBoardProps {
  className?: string;
  selectedLanguage: string;
  onClose: () => void;
}

export const SnippetsLanguagesBoard: React.FC< SnippetsSnippetBoardProps> = ({ className, selectedLanguage, onClose }:  SnippetsSnippetBoardProps) => {
    
  const [snippet, setSnippets] = useState<SnippetType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetType | null>(null);
  const [isCreateSnippetClicked, setCreateSnippetClicked] = useState<boolean>(false);

    const fetchSnippets = async () => {
      try {
        const responseData: SnippetType[] = await controller.getSnippetsByLanguage(selectedLanguage);
        setSnippets(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };


  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleSnippetCardClick = (snippet: SnippetType) => {
    setSelectedSnippet(snippet);
  };

  const handleRefreshBoard = () => {
    fetchSnippets();
  }


  const handleCreateSnippetClick = () => {
    setCreateSnippetClicked(true);
  };

  const handleCloseCreateSnippet = () => {
    setCreateSnippetClicked(false);
  };

  const chunkSize = 3;

  if (snippet === undefined) {
    return <div>Loading...</div>;
  }

  const chunkedData = Array.from({ length: Math.ceil(snippet.length / chunkSize) }, (_, index) =>
    snippet.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    
    <div className={classNames(styles.root, className)}>
      {selectedSnippet ? (
        <SnippetBoard 
        
          onClose={() => setSelectedSnippet(null)}
          dateCreated={selectedSnippet.dateCreated}
          lastDateModified={selectedSnippet.lastDateModified}
          programmingLanguage={selectedSnippet.programmingLanguage}
          codeArray={selectedSnippet.codeArray}
          writeUp={selectedSnippet.writeUp}
          snippetDescription={selectedSnippet.snippetDescription}
          snippetSource={selectedSnippet.snippetSource}
          snippetSourceLinks={selectedSnippet.snippetSourceLinks}
          snippetName={selectedSnippet.snippetName} 
          refreshBoard={() =>  handleRefreshBoard()}      
            />
      ) : (
        <>
            
          <div className={styles.divMain}>
          <button onClick={onClose}>Close</button>
            <span className={styles.spanSnippetsBar}>
              <div className={styles.divLeftBar}>
              <h4 className={styles.SnippetWord}>{selectedLanguage}</h4>
              </div>
              <div className={styles.divRightBar}>
                <span>
                  <button  className={styles.buttonCreateNewSnippet} onClick={handleCreateSnippetClick}>
                    Create new Snippet
                  </button>
                </span>
              </div>
            </span>
          </div>
     
          {chunkedData.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
           
           {row.map((snippet, colIndex) => (
  
        <div className={styles.parentItem} onClick={() => handleSnippetCardClick(snippet)}>
           <SnippetCard 
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
            </div>
          ))}
          {isCreateSnippetClicked && (
            <div className={styles.modalOverlay}>
              <CreateSnippet onClose={handleCloseCreateSnippet} programmingLanguage={selectedLanguage}  refreshBoard={() =>  handleRefreshBoard()}        />
            </div>
          )}
        </>
      )}
    </div>
  );
};
