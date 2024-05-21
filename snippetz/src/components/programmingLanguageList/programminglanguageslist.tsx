import classNames from 'classnames';
import styles from './programminglanguageslist.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { LanguageCard } from '../language-card/language-card';
import { AddLanguage } from '../add-language/add-language';


export interface LanguagesBoardProps {
  className?: string;

}

interface LanguageType {
    languageID: number;
    creationDate: string;
    snippetCount: string;
  }

export const ProgrammingLanguagesList: React.FC<LanguagesBoardProps> = ({ className }: LanguagesBoardProps) => {
  const [projects, setProjects] = useState<LanguageType[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<LanguageType | null>(null);
  const [isCreateProjectClicked, setCreateProjectClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const responseData: LanguageType[] = await controller.getLanguages();
        setProjects(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };

    fetchLanguages();
  }, []);

  const handleProjectCardClick = (project: LanguageType) => {
    setSelectedProject(project);
  };

  const handleCreateProjectClick = () => {
    setCreateProjectClicked(true);
  };

  const handleCloseCreateProject = () => {
    setCreateProjectClicked(false);
  };

  const chunkSize = 3;

  if (projects === undefined) {
    return <div>Loading...</div>;
  }

  const chunkedData = Array.from({ length: Math.ceil(projects.length / chunkSize) }, (_, index) =>
    projects.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    <div className={classNames(styles.root, className)}>
      {selectedProject ? (
        <SnippetsLanguagesBoard
         
        />
      ) : (
        <>
          <div className={styles.divMain}>
            <span className={styles.spanProjectsBar}>
              <div className={styles.divLeftBar}>
                <h4 className={styles.ProjectWord}>Projects</h4>
              </div>
              <div className={styles.divRightBar}>
                <span>
                  <button className={styles.buttonCreateNewProject} onClick={handleCreateProjectClick}>
                    Create new Snippet
                  </button>
                </span>
              </div>
            </span>
          </div>
     
          {chunkedData.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
           
           {row.map((project, colIndex) => (
  
        <div className={styles.parentItem} onClick={() => handleProjectCardClick(project)}>
            <LanguageCard
               
            />
        </div>
   
))}
            </div>
          ))}
          {isCreateProjectClicked && (
            <div className={styles.modalOverlay}>
              <AddLanguage onClose={handleCloseCreateProject} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
