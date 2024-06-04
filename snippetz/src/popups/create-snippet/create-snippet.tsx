import classNames from 'classnames';
import styles from './create-snippet.module.scss';
import React, { useState } from 'react';
import IconDropdownMenu from '@/components/icon-menu/iconmenu';
import Close from '@/styles/icons/X.svg';
import Image from 'next/image';

export interface CreateSnippetProps {
  className?: string;
  onClose: () => void;
}

export const CreateSnippet = ({ className, onClose }: CreateSnippetProps) => {
  const [open, setOpen] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [lastDateModified, setLastDateModified] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [codeArray, setCodeArray] = useState<string[]>([""]);
  const [writeUp, setWriteUp] = useState<string[]>([""]);
  const [snippetDescription, setSnippetDescription] = useState("");
  const [snippetSource, setSnippetSource] = useState("");
  const [snippetSourceLinks, setSnippetSourceLinks] = useState<string[]>([""]);

  const handleDropdownToggle = () => {
    setOpen(!open);
  };

  const handleAddSnippet = async () => {
    const snippetID = new Date().getTime(); // Use current date and time as ID
    const newSnippet = {
      snippetID,
      dateCreated,
      lastDateModified,
      programmingLanguage,
      codeArray,
      writeUp,
      snippetDescription,
      snippetSource,
      snippetSourceLinks,
      snippetName
    };

    try {
      const response = await fetch('http://localhost:4000/api/snippets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSnippet)
      });

      if (response.ok) {
        onClose(); // Close the modal after successful creation
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error creating snippet:', error);
      alert('An error occurred while creating the snippet');
    }
  };

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const handleFieldChange = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.divMain}>
        <button onClick={onClose} className={styles.closeButton}><Image src={Close} height={24} width={24} alt="Close" /></button>
        <div className={styles.divLine}></div>
        <h1>Snippet Name</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetName}
          onChange={(e) => setSnippetName(e.target.value)}
        />
        <h1>Date Created</h1>
        <input
          type="date"
          className={styles.descriptionTextArea}
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
        />
        <h1>Last Date Modified</h1>
        <input
          type="date"
          className={styles.descriptionTextArea}
          value={lastDateModified}
          onChange={(e) => setLastDateModified(e.target.value)}
        />
        <h1>Programming Language</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={programmingLanguage}
          onChange={(e) => setProgrammingLanguage(e.target.value)}
        />
        <h1>Code</h1>
        {codeArray.map((code, index) => (
          <textarea
            key={index}
            className={styles.descriptionTextArea}
            value={code}
            onChange={(e) => handleFieldChange(index, e.target.value, setCodeArray)}
          />
        ))}
        <button onClick={() => handleAddField(setCodeArray)}>Add More Code</button>
        <h1>Write Up</h1>
        {writeUp.map((write, index) => (
          <textarea
            key={index}
            className={styles.descriptionTextArea}
            value={write}
            onChange={(e) => handleFieldChange(index, e.target.value, setWriteUp)}
          />
        ))}
        <button onClick={() => handleAddField(setWriteUp)}>Add More Write Up</button>
        <h1>Snippet Description</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetDescription}
          onChange={(e) => setSnippetDescription(e.target.value)}
        />
        <h1>Snippet Source</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetSource}
          onChange={(e) => setSnippetSource(e.target.value)}
        />
        <h1>Snippet Source Links</h1>
        {snippetSourceLinks.map((link, index) => (
          <textarea
            key={index}
            className={styles.descriptionTextArea}
            value={link}
            onChange={(e) => handleFieldChange(index, e.target.value, setSnippetSourceLinks)}
          />
        ))}
        <button onClick={() => handleAddField(setSnippetSourceLinks)}>Add More Links</button>
        <div className={styles.divLine}></div>
        <button className={styles.button} onClick={handleAddSnippet}>Add</button>
      </div>
    </div>
  );
};
