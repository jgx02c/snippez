// src/App.tsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './dashboard.module.scss';
import { HomeBoard } from '../components/home-board/home-board';
import { ProjectsBoard } from '../components/projects-board/projects-board';
import { RecentBoard } from '../components/recent-board/recent-board';
import { CommunityBoard } from '../components/community-board/community-board';
import { SettingsBoard } from '../components/settings-board/settings-board';
import { MySnippetsBoard } from '../components/my-snippets-board/my-snippets-board';

export interface AppProps {
  className?: string;
}

type ComponentType = 1 | 2 | 3 | 4 | 5 | 6 ;

export const Dashboard = ({ className }: AppProps) => {

  const handleButtonClick = (componentNumber: ComponentType) => {
    setCurrentComponent(componentNumber);
  };  

  const [currentComponent, setCurrentComponent] = useState<ComponentType>();

  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return  <HomeBoard />
      case 2:
        return  <ProjectsBoard />
      case 3:
        return  <RecentBoard />
      case 4:
        return  <CommunityBoard />
      case 5:
        return  <MySnippetsBoard />
        case 6:
        return  <SettingsBoard />
      default:
        return null;
    }
  };

  return (
      <div className={classNames(styles.root, className)}>
        <span className={styles.mainSpan}>
        <div className={styles.divMain}>
            <div className={styles.divImg}>
                <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgClass} />
            </div>
            <div className={styles.divButtons}>
                <button className={styles.buttonClass} onClick={() => handleButtonClick(1)}>Home</button>
                <button className={styles.buttonClass} onClick={() => handleButtonClick(2)}>Projects</button>
                <button className={styles.buttonClass} onClick={() => handleButtonClick(3)}>Recents</button>
                <button className={styles.buttonClass} onClick={() => handleButtonClick(4)}>Community</button>
                <button className={styles.buttonClass} onClick={() => handleButtonClick(5)}>My Snippets</button>
                <button className={styles.buttonClass} onClick={() => handleButtonClick(6)}>Settings</button>
            </div>
        </div>
    
            <div className={styles.divDivider} />
            <div className={styles.content}>
        {renderComponent()}
        </div>
        </span>
        </div>
  );
};


export default Dashboard;