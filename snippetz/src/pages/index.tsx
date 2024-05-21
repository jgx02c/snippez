import Image from "next/image";
import { Inter } from "next/font/google";
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { HomeBoard } from "@/boards/home-board/home-board";

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
        return <HomeBoard />;
      case 2:
        return <HomeBoard />;
      case 3:
        return <HomeBoard />;
      case 4:
        return <HomeBoard />;
      case 5:
        return <HomeBoard />;
      case 6:
        return <HomeBoard />;
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
              <Image width={24} height={24} src="" alt="" className={styles.imgClass} />
            </div>
            <div className={styles.divButtons}>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(1)}>Home</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(2)}>Projects</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(3)}>Recents</button>
              <button className={styles.buttonClass} onClick={() => handleButtonClick(6)}>Settings</button>
            </div>
          </div>
          <div className={styles.bottom}>
          <h6>Snippetz Version: 1.0</h6>
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
