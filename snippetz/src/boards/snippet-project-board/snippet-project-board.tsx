import classNames from 'classnames';
import styles from './snippet-project-board.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { LanguageCard } from '@/components/language-card/language-card';
import { SnippetCard } from '@/components/snippet-card/snippet-card';
import { ProjectType, SnippetType, LanguageType } from '@/types/types';
import { SnippetBoard } from '../snippet-board/snippet-board';
import { CreateSnippet } from '@/popups/create-snippet/create-snippet';
import { AddLanguage } from '@/popups/add-language/add-language';
import { SnippetLanguageProjectBoard } from '@/boards/snippet-language-project-board/snippetlanguageprojectboard';
import { AddSnippet } from '@/popups/add-snippet/addsnippet';

export interface ProjectsBoardProps {
  className?: string;
  selectedProjectName: string;
  onClose: () => void;
}

type ComponentType = 1 | 2 | 3;

export const SnippetProjectBoard: React.FC<ProjectsBoardProps> = ({ className, selectedProjectName, onClose }: ProjectsBoardProps) => {
  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetType | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentComponent, setCurrentComponent] = useState<ComponentType | null>(null);

  const handleButtonClick = (componentNumber: ComponentType) => {
    setCurrentComponent(componentNumber);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return <AddLanguage onClose={handleClosePopup} onSelectLanguage={handleLanguageCardClick} />;
      case 2:
        return <AddSnippet onClose={handleClosePopup} onAddSnippets={(snippets) => {
          // handle added snippets
          handleClosePopup();
        }} />;
      case 3:
        return <CreateSnippet onClose={handleClosePopup} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const responseData: ProjectType = await controller.getProject(selectedProjectName);
        setProject(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };

    fetchProject();
  }, [selectedProjectName]);

  const handleSnippetCardClick = (snippet: SnippetType) => {
    setSelectedSnippet(snippet);
  };

  const handleLanguageCardClick = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleClosePopup = () => {
    setCurrentComponent(null);
  };

  const handleCloseLanguageBoard = () => {
    setSelectedLanguage(null);
  };

  const handleCloseSnippetBoard = () => {
    setSelectedSnippet(null);
  };

  if (project === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(styles.root, className)}>
      {selectedSnippet ? (
        <SnippetBoard
          onClose={handleCloseSnippetBoard}
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
      ) : selectedLanguage ? (
        <SnippetLanguageProjectBoard
          selectedLanguage={selectedLanguage}
          onClose={handleCloseLanguageBoard}
        />
      ) : (
        <>
          <div className={styles.top}>
            <button onClick={onClose}>Close</button>
            <span className={styles.spanTop}>
              <h1 className={styles.h1Class}>{project.projectName}</h1>
              <div className={styles.ButtonDiv}>
                <button className={styles.Buttons} onClick={() => handleButtonClick(1)}>Add Language</button>
                <button className={styles.Buttons} onClick={() => handleButtonClick(2)}>Add Snippet</button>
                <button className={styles.Buttons} onClick={() => handleButtonClick(3)}>Create Snippet</button>
              </div>
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.languagesRow}>
              {project.projectSnippets.map((projectSnippet, index) => {
                const { language } = projectSnippet;
                if (language) {
                  return (
                    <div
                      key={index}
                      className={styles.parentItem}
                      onClick={() => handleLanguageCardClick(language.languageName)}
                    >
                      <LanguageCard
                        key={index}
                        languageID={language.languageID}
                        languageName={language.languageName}
                        languageIcon={language.languageIcon}
                        languageSnippetCount={language.languageSnippetCount}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className={styles.snippetsGrid}>
              {project.projectSnippets.flatMap((projectSnippet) =>
                projectSnippet.snippets.map((snippet, index) => (
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
                ))
              )}
            </div>
          </div>
          {currentComponent !== null && (
            <div className={styles.modalOverlay}>
              {renderComponent()}
            </div>
          )}
        </>
      )}
    </div>
  );
};
