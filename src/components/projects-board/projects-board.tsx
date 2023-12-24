// AllProjects.tsx
import classNames from 'classnames';
import styles from './projects-board.module.scss';
import React, { useEffect, useState } from 'react';
import { ProjectCard } from '../project-card/project-card';
import { ProjectBoard, ProjectBoardProps } from '../project-board/project-board';

// getting the controller for the files fetch
import * as controller from '../../../classes/controller.js';

export interface Home_AllProjectsProps {
  className?: string;
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

export const ProjectsBoard: React.FC<Home_AllProjectsProps> = ({ className }: Home_AllProjectsProps) => {
  const [projects, setProjects] = useState<ProjectType[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const responseData: ProjectType[] = await controller.getProjects();
        setProjects(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };

    fetchProject();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  const handleProjectCardClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const chunkSize = 3; // Number of child components in each row

  // Check if projects is defined before mapping over it
  if (projects === undefined) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  // Chunk the data array into arrays of size chunkSize
  const chunkedData = Array.from({ length: Math.ceil(projects.length / chunkSize) }, (_, index) =>
    projects.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    <div className={classNames(styles.root, className)}>
      {selectedProject ? (
        <ProjectBoard projectID={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : (
        <>
          <div className={styles.divMain}>
            <span className={styles.spanProjectsBar}>
              <div className={styles.divLeftBar}>
                <h4 className={styles.ProjectWord}>Projects</h4>
              </div>
              <div className={styles.divRightBar}>
                <span>
                  <button className={styles.buttonSearch}>Search</button>
                  <button className={styles.buttonAdjust}>Adjustment</button>
                  <button className={styles.buttonCreateNewProject}>Create new Project</button>
                </span>
              </div>
            </span>
          </div>
          {chunkedData.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((project, colIndex) => (
                <div key={colIndex} className={styles.parentItem} onClick={() => handleProjectCardClick(project.projectID)}>
                  <ProjectCard
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
        </>
      )}
    </div>
  );
};