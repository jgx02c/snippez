import classNames from 'classnames';
import styles from './create-snippet.module.scss';
import React, { useState } from 'react';
import Close from '@/styles/icons/X.svg';
import Image from 'next/image';
import { createSnippet } from '../../../classes/controller.js'; // Adjust the import path as necessary

export interface CreateSnippetProps {
  className?: string;
  onClose: () => void;
  programmingLanguage?: string; // Optional prop to autofill the programming language
}

interface SnippetState {
  snippetName: string;
  programmingLanguage: string;
  codeArray: string[];
  writeUp: string[];
  snippetDescription: string;
  snippetSource: string;
  snippetSourceLinks: string[];
}

export const CreateSnippet = ({ className, onClose, programmingLanguage = '' }: CreateSnippetProps) => {
  const [snippetState, setSnippetState] = useState<SnippetState>({
    snippetName: "",
    programmingLanguage: programmingLanguage,
    codeArray: [""],
    writeUp: [""],
    snippetDescription: "",
    snippetSource: "",
    snippetSourceLinks: [""]
  });

  const [history, setHistory] = useState<SnippetState[]>([]);

  const handleAddSnippet = async () => {
    const snippetID = new Date().getTime(); // Use current date and time as ID
    const dateCreated = new Date().toISOString();
    const lastDateModified = new Date().toISOString();

    const newSnippet = {
      snippetID,
      dateCreated,
      lastDateModified,
      ...snippetState
    };

    try {
      await createSnippet(newSnippet);
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error('Error creating snippet:', error);
      alert('An error occurred while creating the snippet');
    }
  };

  const saveToHistory = () => {
    setHistory(prev => [...prev, { ...snippetState }]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setSnippetState(previousState);
      setHistory(history.slice(0, -1));
    }
  };

  const handleAddField = (field: keyof SnippetState) => {
    saveToHistory();
    setSnippetState(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const handleDeleteField = (field: keyof SnippetState, index: number) => {
    saveToHistory();
    setSnippetState(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (field: keyof SnippetState, index: number, value: string) => {
    saveToHistory();
    setSnippetState(prev => {
      const newValues = [...(prev[field] as string[])];
      newValues[index] = value;
      return { ...prev, [field]: newValues };
    });
  };

  const handleInputChange = (field: keyof SnippetState, value: string) => {
    saveToHistory();
    setSnippetState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.divMain}>
        <button onClick={onClose} className={styles.closeButton}><Image src={Close} height={24} width={24} alt="Close" /></button>
        <div className={styles.divLine}></div>
        <h1>Snippet Name</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetState.snippetName}
          onChange={(e) => handleInputChange("snippetName", e.target.value)}
        />
        <h1>Programming Language</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetState.programmingLanguage}
          onChange={(e) => handleInputChange("programmingLanguage", e.target.value)}
          readOnly={!!programmingLanguage} // Make read-only if programmingLanguage is provided
        />
        <h1>Code</h1>
        {snippetState.codeArray.map((code, index) => (
          <div key={index} className={styles.fieldContainer}>
            <textarea
              className={styles.descriptionTextArea}
              value={code}
              onChange={(e) => handleFieldChange("codeArray", index, e.target.value)}
            />
            <button className={styles.deleteButton} onClick={() => handleDeleteField("codeArray", index)}>Delete</button>
          </div>
        ))}
        <button className={styles.addButton} onClick={() => handleAddField("codeArray")}>Add More Code</button>
        <h1>Write Up</h1>
        {snippetState.writeUp.map((write, index) => (
          <div key={index} className={styles.fieldContainer}>
            <textarea
              className={styles.descriptionTextArea}
              value={write}
              onChange={(e) => handleFieldChange("writeUp", index, e.target.value)}
            />
            <button className={styles.deleteButton} onClick={() => handleDeleteField("writeUp", index)}>Delete</button>
          </div>
        ))}
        <button className={styles.addButton} onClick={() => handleAddField("writeUp")}>Add More Write Up</button>
        <h1>Snippet Description</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetState.snippetDescription}
          onChange={(e) => handleInputChange("snippetDescription", e.target.value)}
        />
        <h1>Snippet Source</h1>
        <textarea
          className={styles.descriptionTextArea}
          value={snippetState.snippetSource}
          onChange={(e) => handleInputChange("snippetSource", e.target.value)}
        />
        <h1>Snippet Source Links</h1>
        {snippetState.snippetSourceLinks.map((link, index) => (
          <div key={index} className={styles.fieldContainer}>
            <textarea
              className={styles.descriptionTextArea}
              value={link}
              onChange={(e) => handleFieldChange("snippetSourceLinks", index, e.target.value)}
            />
            <button className={styles.deleteButton} onClick={() => handleDeleteField("snippetSourceLinks", index)}>Delete</button>
          </div>
        ))}
        <button className={styles.addButton} onClick={() => handleAddField("snippetSourceLinks")}>Add More Links</button>
        <div className={styles.divLine}></div>
        <button className={styles.saveButton} onClick={handleAddSnippet}>Add</button>
        <button className={styles.undoButton} onClick={handleUndo} disabled={history.length === 0}>Undo</button>
      </div>
    </div>
  );
};
