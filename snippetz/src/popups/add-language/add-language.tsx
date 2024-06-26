import classNames from 'classnames';
import styles from './add-language.module.scss';
import React, { useState, useEffect } from 'react';
import Close from '@/styles/icons/X.svg';
import Image from 'next/image';
import { getAllLanguages } from '../../../classes/controller.js'; // Adjust the import path as necessary
import { LanguageType } from '@/types/types';

export interface AddLanguageProps {
  className?: string;
  onClose: () => void;
  onSelectLanguage: (language: any) => void;
  refreshBoard: () => void;
}

export const AddLanguage: React.FC<AddLanguageProps> = ({ className, onClose, onSelectLanguage }) => {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getAllLanguages();
        setLanguages(data);
      } catch (err) {
        setError('Failed to fetch languages');
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.divMain}>
        <button onClick={onClose} className={styles.closeButton}>
          <Image src={Close} height={24} width={24} alt="Close" />
        </button>
        <div className={styles.divLine}></div>
        <h1>Select Language</h1>
        <div className={styles.languagesGrid}>
          {languages.map((language, index) => (
            <div
              key={index}
              className={styles.languageItem}
              onClick={() => onSelectLanguage(language.languageName)}
            >
              <img src={language.languageIcon} alt={language.languageName} />
              <p>{language.languageName}</p>
            </div>
          ))}
        </div>
        <div className={styles.divLine}></div>
      </div>
    </div>
  );
};
