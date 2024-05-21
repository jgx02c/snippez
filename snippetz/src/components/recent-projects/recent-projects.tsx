// Home_RecentlyUpdatedProjects.tsx
import classNames from 'classnames';
import styles from './recent-projects.module.scss';
import React, { useState } from 'react';
import { ProjectCard } from '../project-card/project-card';

export interface Home_RecentlyUpdatedProjectsProps {
    className?: string;
}

interface ProjectType {
    Name: string;
}

export const RecentProjects: React.FC<Home_RecentlyUpdatedProjectsProps> = ({ className }: Home_RecentlyUpdatedProjectsProps) => {
    const projects: ProjectType[] = [
        { Name: "jack" },
        { Name: "jake" },
        { Name: "jakasde" },
        { Name: "jesus" },
        { Name: "jane" },
        { Name: "jakassdde" },
        { Name: "jacasdddk" },
        { Name: "jaaaaake" },
        { Name: "jakwwwasde" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + projects.length) % projects.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % projects.length);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divTop}>
                <h1 className={styles.h1Class}>Welcome, User. It&apos;s Great to have you!</h1>
                <h2 className={styles.h2Class}>Recently Updated Projects</h2>
            </div>
            <div className="carousel-container">
                <span className={styles.spanCarousel}>
                    <button className="carousel-button" onClick={handlePrev}>
                        &lt;
                    </button>
                    <div className={styles.carousel}>
                        {projects.slice(currentIndex, currentIndex + 3).map((project, index) => (
                            <div key={index} className={`carousel-item ${currentIndex === index ? 'active' : ''}`}>
                                <ProjectCard Name={project.Name} />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-button" onClick={handleNext}>
                        &gt;
                    </button></span></div>
        </div>
    );
};
