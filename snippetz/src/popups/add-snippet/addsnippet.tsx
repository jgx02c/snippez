import classNames from 'classnames';
import styles from './addsnippet.module.scss';
import React, { useState, useEffect } from 'react';
import Close from '@/styles/icons/X.svg';
import Image from 'next/image';
import ArrowBack from '@/styles/icons/X.svg';

export interface AddSnippetProps {
  className?: string;
  onClose: () => void;
  onAddSnippets: (snippets: any[]) => void;
}

export const AddSnippet: React.FC<AddSnippetProps> = ({ className, onClose, onAddSnippets }) => {
  const [step, setStep] = useState<number>(1);
  const [languages, setLanguages] = useState<any[]>([]);
  const [snippets, setSnippets] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedSnippets, setSelectedSnippets] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/languages');
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        console.error('Failed to fetch languages', err);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      const fetchSnippets = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/snippets/${selectedLanguage}`);
          const data = await response.json();
          setSnippets(data);
        } catch (err) {
          console.error('Failed to fetch snippets', err);
        }
      };

      fetchSnippets();
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setStep(2);
  };

  const handleSnippetSelect = (snippetID: string) => {
    const updatedSelectedSnippets = new Set(selectedSnippets);
    if (updatedSelectedSnippets.has(snippetID)) {
      updatedSelectedSnippets.delete(snippetID);
    } else {
      updatedSelectedSnippets.add(snippetID);
    }
    setSelectedSnippets(updatedSelectedSnippets);
  };

  const handleAddSnippets = () => {
    const selectedSnippetObjects = snippets.filter(snippet => selectedSnippets.has(snippet.snippetID));
    onAddSnippets(selectedSnippetObjects);
    onClose();
  };

  const goBack = () => {
    setStep(1);
    setSelectedLanguage(null);
    setSnippets([]);
    setSelectedSnippets(new Set());
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.divMain}>
        <button onClick={onClose} className={styles.closeButton}>
          <Image src={Close} height={24} width={24} alt="Close" />
        </button>
        {step === 2 && (
          <button onClick={goBack} className={styles.backButton}>
            <Image src={ArrowBack} height={24} width={24} alt="Go Back" />
          </button>
        )}
        <div className={styles.divLine}></div>
        {step === 1 ? (
          <>
            <h1>Select Language</h1>
            <div className={styles.languagesGrid}>
              {languages.map((language, index) => (
                <div
                  key={index}
                  className={styles.languageItem}
                  onClick={() => handleLanguageSelect(language.languageName)}
                >
                  <img src={language.languageIcon} alt={language.languageName} />
                  <p>{language.languageName}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>Select Snippets</h1>
            <div className={styles.snippetsGrid}>
              {snippets.map((snippet, index) => (
                <div
                  key={index}
                  className={classNames(styles.snippetItem, { [styles.selected]: selectedSnippets.has(snippet.snippetID) })}
                  onClick={() => handleSnippetSelect(snippet.snippetID)}
                >
                  <p>{snippet.snippetName}</p>
                </div>
              ))}
            </div>
            <button className={styles.addButton} onClick={handleAddSnippets}>Add Selected Snippets</button>
          </>
        )}
        <div className={styles.divLine}></div>
      </div>
    </div>
  );
};
