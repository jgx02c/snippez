// AllProjects.tsx
import classNames from 'classnames';
import styles from './project-board.module.scss';
import React, { useEffect, useState } from 'react';
import { ProjectCard } from '../project-card/project-card';

// getting the controller for the files fetch
import * as controller from '../../../classes/controller.js';
import { CreateProject} from '../create-project/create-project';
import { SnippetCard } from '../snippet-card/snippet-card';
import { SnippetBoard } from '../snippet-board/snippet-board';

export interface Home_AllProjectsProps {
  className?: string;

}

interface ProjectBoardProps {
    className?: string;
    onClose: () => void;
    snippetID: number;
    snippetName: string;
    snippetDescription: string;
    snippetCodes: snippetCode[];
    snippetWriteups: writeup[];
    snippetPicture: string;
    snippetDate: string;
    snippetSource: string;
    snippetNumberOfProjectsUsed: number;
}

interface ProjectType {
  projectID: number;
  userID: number;
  status: string;
  collaboration: boolean;
  collaborationID: number;
  uploadDate: string;
  projectDueDate: string;
  projectName: string;
}

export const ProjectBoard: React.FC<ProjectBoardProps> = ({ className }: ProjectBoardProps) => {
    const id = 0;
    const filter = "none";

  const [projects, setProjects] = useState<ProjectType[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isCreateProjectClicked, setCreateProjectClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const responseData: ProjectType[] = await controller.getSnippets(id);
        setProjects(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };

    fetchProject();
  }, []);

  const handleProjectCardClick = (project: ProjectType) => {
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
        <SnippetBoard 
        onClose={() => setSelectedProject(null)}
        snippetID={0} 
        snippetName={''} 
        snippetDescription={''} 
        snippetCodes={[]} 
        snippetWriteups={[]} 
        snippetPicture={''} 
        snippetDate={''} 
        snippetSource={''} 
        snippetNumberOfProjectsUsed={0}         
        />
      ) : (
        <>
            
          <div className={styles.divMain}>
            <span className={styles.spanProjectsBar}>
              <div className={styles.divLeftBar}>
                <h4 className={styles.ProjectWord}>Project Snippets</h4>
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
            <SnippetCard
                key={project.projectID} 
                projectName={project.projectName}
                projectDueDate={project.projectDueDate}
                projectID={project.projectID}
                userID={project.userID}
                status={project.status}
                collaboration={project.collaboration}
                collaborationID={project.collaborationID}
                uploadDate={project.uploadDate}
            />
        </div>
   
))}
            </div>
          ))}
          {isCreateProjectClicked && (
            <div className={styles.modalOverlay}>
              <CreateProject onClose={handleCloseCreateProject} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
