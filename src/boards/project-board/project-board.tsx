import classNames from 'classnames';
import styles from './project-board.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';
import { ProjectCard } from '@/components/project-card/project-card';
import { CreateProject } from '@/popups/create-project/create-project';
import { SnippetProjectBoard } from '@/boards/snippet-project-board/snippet-project-board';
import { ProjectType } from '@/types/types';

export interface projectsBoardProps {
  className?: string;
}

export const ProjectBoard: React.FC<projectsBoardProps> = ({ className }: projectsBoardProps) => {

  const [projects, setProjects] = useState<ProjectType[]>();
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isCreateProjectClicked, setCreateProjectClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData: ProjectType[] = await controller.getAllProjects();
        setProjects(responseData);
        console.log("response", responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };

    fetchProjects();
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

  if (projects === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classNames(styles.root, className)}>
    
      {selectedProject ? (
        <SnippetProjectBoard selectedProjectName={selectedProject.projectName} onClose={() => setSelectedProject(null)} />
      ) : (
        <>
        <div className={styles.top}>
        <span className={styles.spanTop}>
          <div className={styles.left}>
            <h1>Programming projects</h1>
          </div>
          <div className={styles.right}>
            <button className={styles.button} onClick={handleCreateProjectClick}>Create Project</button>
          </div>
        </span>
      </div>
        <div className={styles.content}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={styles.parentItem}
              onClick={() => handleProjectCardClick(project)}
            >
           <ProjectCard
                dateCreated={project.dateCreated}
                lastDateModified={project.lastDateModified}
                projectName={project.projectName}
                projectSnippets={project.projectSnippets.map(ps => ({
                  language: ps.language.languageName,
                  snippets: ps.snippets.map(snippet => snippet.snippetName)
                }))}
              />
            </div>
          ))}
          {isCreateProjectClicked && (
            <div className={styles.modalOverlay}>
              <CreateProject
                onClose={handleCloseCreateProject}
              />
            </div>
          )}
        </div>
        </>
      )}
    </div>
  );
};
