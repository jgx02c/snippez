import classNames from 'classnames';
import styles from './snippet-project-board.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { LanguageCard } from '@/components/language-card/language-card';
import { SnippetCard } from '@/components/snippet-card/snippet-card';
import { ProjectType, SnippetType, LanguageType } from '@/types/types';
import { SnippetBoard } from '../snippet-board/snippet-board';

export interface projectsBoardProps {
  className?: string;
  selectedProjectName: string;
}

export const SnippetProjectBoard: React.FC<projectsBoardProps> = ({ className, selectedProjectName }: projectsBoardProps) => {
  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetType | null>(null);
  const [isCreateSnippetClicked, setCreateSnippetClicked] = useState<boolean>(false);

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

  if (project === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.top}>
        <span className={styles.spanTop}>
          <div className={styles.left}>
            <h1>{project.projectName} - Languages and Snippets</h1>
          </div>
        </span>
      </div>
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
        <div className={styles.content}>
          <div className={styles.languagesRow}>
            {project.projectSnippets.map((projectSnippet, index) => {
              const { language } = projectSnippet;
              if (language) {
                return (
                  <LanguageCard
                    key={index}
                    languageID={language.languageID}
                    languageName={language.languageName}
                    languageIcon={language.languageIcon}
                    languageSnippetCount={language.languageSnippetCount}
                  />
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
          {isCreateSnippetClicked && (
            <div className={styles.modalOverlay}>
              {/* Add your modal component for creating a new snippet here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
