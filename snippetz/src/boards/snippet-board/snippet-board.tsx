import classNames from 'classnames';
import styles from './snippet-board.module.scss';
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript'; // Adjust mode as needed
import 'ace-builds/src-noconflict/theme-github';
import * as controller from '../../../classes/controller.js';

export interface SnippetBoardProps {
    className?: string;
    onClose: () => void;
    snippetID: number;
    dateCreated: string;
    lastDateModified: string;
    programmingLanguage: string;
    codeArray: string[];
    writeUp: string[];
    snippetDescription: string;
    snippetSource: string;
    snippetSourceLinks: string[];
    snippetName: string;
}

export const SnippetBoard = ({
    className,
    onClose,
    snippetID,
    dateCreated,
    lastDateModified,
    programmingLanguage,
    codeArray,
    writeUp,
    snippetName,
    snippetDescription
}: SnippetBoardProps) => {
    const [codeArrayState, setCodeArrayState] = useState<string[]>(codeArray);
    const [writeUpState, setWriteUpState] = useState<string[]>(writeUp);
    const [snippetNameState, setSnippetNameState] = useState<string>(snippetName);
    const [snippetDescriptionState, setSnippetDescriptionState] = useState<string>(snippetDescription);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
    const [history, setHistory] = useState<{ codeArray: string[], writeUp: string[] }[]>([]);

    const saveToHistory = () => {
        setHistory([...history, { codeArray: codeArrayState, writeUp: writeUpState }]);
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setCodeArrayState(previousState.codeArray);
            setWriteUpState(previousState.writeUp);
            setHistory(history.slice(0, -1));
            setHasUnsavedChanges(true);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        const newCodeArray = [...codeArrayState];
        newCodeArray[index] = value;
        setCodeArrayState(newCodeArray);
        setHasUnsavedChanges(true);
    };

    const handleWriteUpChange = (index: number, value: string) => {
        const newWriteUp = [...writeUpState];
        newWriteUp[index] = value;
        setWriteUpState(newWriteUp);
        setHasUnsavedChanges(true);
    };

    const handleAddCode = () => {
        saveToHistory();
        setCodeArrayState([...codeArrayState, '']);
        setWriteUpState([...writeUpState, '']);
        setHasUnsavedChanges(true);
    };

    const handleDeleteCode = (index: number) => {
        saveToHistory();
        const newCodeArray = codeArrayState.filter((_, i) => i !== index);
        const newWriteUp = writeUpState.filter((_, i) => i !== index);
        setCodeArrayState(newCodeArray);
        setWriteUpState(newWriteUp);
        setHasUnsavedChanges(true);
    };

    const handleSaveChanges = async () => {
        const updatedSnippet = {
            snippetID,
            dateCreated,
            lastDateModified: new Date().toISOString(),
            programmingLanguage,
            codeArray: codeArrayState,
            writeUp: writeUpState,
            snippetDescription: snippetDescriptionState,
            snippetSource: '',
            snippetSourceLinks: [],
            snippetName: snippetNameState
        };

        try {
            await controller.updateSnippet(programmingLanguage, snippetName, updatedSnippet);
            alert('Snippet updated successfully!');
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating snippet:', error);
            alert('Error updating snippet.');
        }
    };

    const handleDeleteSnippet = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this snippet?');
        if (!confirmDelete) {
            return;
        }

        try {
            await controller.deleteSnippet(snippetID, programmingLanguage);
            alert('Snippet deleted successfully!');
            onClose(); // Close the modal after deletion
        } catch (error) {
            console.error('Error deleting snippet:', error);
            alert('Error deleting snippet.');
        }
    };

    const handleClose = () => {
        if (hasUnsavedChanges) {
            const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
            if (!confirmClose) {
                return;
            }
        }
        onClose();
    };

    const handleCopyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Code copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy code:', error);
            alert('Failed to copy code.');
        }
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <button onClick={handleClose}>Close</button>
                <button onClick={handleDeleteSnippet} className={styles.deleteButton}>Delete Snippet</button>
                <div className={styles.divTop}>
                    <input
                        className={styles.snippetNameInput}
                        type="text"
                        value={snippetNameState}
                        onChange={(e) => {
                            setSnippetNameState(e.target.value);
                            setHasUnsavedChanges(true);
                        }}
                    />
                    <textarea
                        className={styles.snippetDescriptionInput}
                        value={snippetDescriptionState}
                        onChange={(e) => {
                            setSnippetDescriptionState(e.target.value);
                            setHasUnsavedChanges(true);
                        }}
                    />
                </div>
                <div className={classNames(styles.divContent)}>
                    {codeArrayState.map((snippetCode, index) => (
                        <React.Fragment key={index}>
                            <div className={styles.divArray}>
                                <AceEditor
                                    mode="javascript" // Adjust mode based on the programming language
                                    theme="github"
                                    name={`editor_${index}`}
                                    value={snippetCode}
                                    onChange={(value) => handleCodeChange(index, value)}
                                    editorProps={{ $blockScrolling: true }}
                                    width="95vh"
                                    height="18vh"
                                    style={{ 
                                        margin: '2vh',
                                        border: '2px solid #d9d9d9',
                                        
                                       
                                     }}
                                    className={styles.divCode}
                                />
                                <span className={styles.spanButtons}>
                                <button className={styles.button} onClick={() => handleCopyToClipboard(snippetCode)}>Copy</button>
                                <button className={styles.button} onClick={() => handleDeleteCode(index)}>Delete</button>
                                </span>
                                <textarea
                                    value={writeUpState[index]}
                                    onChange={(e) => handleWriteUpChange(index, e.target.value)}
                                    className={styles.writeUpInput}
                                />
                               
                            </div>
                        </React.Fragment>
                    ))}
                   
                </div>
                <div className={styles.divExtra}>
                    <button  className={styles.button} onClick={handleAddCode}>Add Code/Write-Up</button>
                    <button className={styles.button} onClick={handleUndo} disabled={history.length === 0}>Undo</button>
                    <button className={styles.button} onClick={handleSaveChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};
