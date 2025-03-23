import classNames from 'classnames';
import styles from './home.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { LanguageCard } from '@/components/language-card/language-card';
import { AddLanguage } from '@/popups/add-language/add-language';
import { SnippetsLanguagesBoard } from '@/boards/snippet-language-board/snippets-language-board';
import { LanguageType } from '@/types/types';
import { CreateLanguage } from '@/popups/create-language/createlanguage';

export interface LanguagesBoardProps {
  className?: string;
}

export const HomeBoard: React.FC<LanguagesBoardProps> = ({ className }: LanguagesBoardProps) => {

  const [languages, setLanguage] = useState<LanguageType[]>();
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isCreateLanguageClicked, setCreateLanguageClicked] = useState<boolean>(false);


    const fetchLanguages = async () => {
      try {
        const responseData: LanguageType[] = await controller.getAllLanguages();
        setLanguage(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };





  const handleLanguageCardClick = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleCreateLanguageClick = () => {
    setCreateLanguageClicked(true);
  };

  const handleCloseCreateLanguage = () => {
    setCreateLanguageClicked(false);
  };

  if (languages === undefined) {
    return <div>Loading...</div>;
  }

  const handleRefreshBoard = () => {
    fetchLanguages();
  }


  return (
    <div className={classNames(styles.root, className)}>
      {selectedLanguage ? (
        <SnippetsLanguagesBoard 
        onClose={() => setSelectedLanguage(null)}
        selectedLanguage={selectedLanguage} 
        />
      ) : (
        <>
        <div className={styles.top}>
        <span className={styles.spanTop}> 
          <div className={styles.left}>
            <h1>Programming Languages</h1>
          </div>
          <div className={styles.right}>
            <button className={styles.button} onClick={handleCreateLanguageClick}>Add Language</button>
          </div>
        </span>
      </div>
        <div className={styles.content}>
       
          {languages.map((language, index) => (
            <div
              key={index}
              className={styles.parentItem}
              onClick={() => handleLanguageCardClick(language.languageName)}
            >
              <LanguageCard
                languageName={language.languageName}
                languageIcon={language.languageIcon}
                languageSnippetCount={language.languageSnippetCount}
              />
            </div>
          ))}
          {isCreateLanguageClicked && (
            <div className={styles.modalOverlay}>
              <CreateLanguage
                 onClose={() => handleCloseCreateLanguage()}
                refreshBoard={() =>  handleRefreshBoard()}     
              />
            </div>
          )}
        </div>
        </>
      )}
    </div>
    
  );
};
