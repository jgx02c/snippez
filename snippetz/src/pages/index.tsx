import Image from "next/image";
import { Inter } from "next/font/google";
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProjectBoard } from "@/boards/project-board/project-board";
import { SettingsBoard } from "@/boards/settings-board/settings-board";
import { RecentBoard } from "@/boards/recent-board/recentboard";
import { HomeBoard } from "@/boards/home-board/home";
import Logo from "@/styles/snippetz.png"
import GPT from "@/boards/gpt-board/gpt";

const inter = Inter({ subsets: ["latin"] });

export interface AppProps {
  className?: string;
}

type ComponentType = 1 | 2 | 3 | 4 | 5 | 6;

const Home: React.FC<AppProps> = ({ className }) => {

  const [currentComponent, setCurrentComponent] = useState<ComponentType>(1);

  const handleButtonClick = (componentNumber: ComponentType) => {
    setCurrentComponent(componentNumber);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return <HomeBoard />
      case 2:
        return <ProjectBoard />
      case 3:
        return <RecentBoard />
      case 4:
        return <GPT />
      case 5:
        return <SettingsBoard />
      case 6:
          return <SettingsBoard />
      default:
        return null;
    }
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.main}>
        <div className={styles.sideBar}>
          <div className={styles.container}>
            <div className={styles.divImg}>
              <Image width={100} height={10} src={Logo} alt="" className={styles.imgClass} />
            </div>
            <div className={styles.divButtons}>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(1)}>Home</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(2)}>Projects</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(3)}>Recents</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(4)}>Chat GPT</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(5)}>Database</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(6)}>Settings</button>
            </div>
          </div>
          <div className={styles.bottom}>
          <h6 className={styles.h6}>Snippetz Version: 1.0</h6>
          </div>
        </div>
        <div className={styles.content}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Home;