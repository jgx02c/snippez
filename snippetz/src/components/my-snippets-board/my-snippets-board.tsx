import classNames from 'classnames';
import styles from './my-snippets-board.module.scss';
import React, { useEffect, useState } from 'react';
import * as controller from '../../../classes/controller.js';

import { SnippetCard } from '../snippet-card/snippet-card';
import { SnippetBoard } from '../snippet-board/snippet-board';
import { AllSnippets } from '../all-snippets/all-snippets';


export interface MySnippetsBoardProps {
  className?: string;
}

export const MySnippetsBoard = ({ className }: MySnippetsBoardProps) => {


    return (
        <div className={classNames(styles.root, className)}>
          
                    <div className={styles.divMain}>
                        <span className={styles.spanMain}>
                            <div className={styles.divText}>
                                <h1>My Snippets</h1>
                            </div>
                            <div className={styles.divButtons}>
                                <select><option>Language</option><option>Recent</option><option>Created</option></select>
                                <button>Search</button>
                                <button>View</button>
                                <button>Create Snippet</button>
                            </div>
                        </span>
                    </div>

                    <AllSnippets />
                
          
        </div>
    );
};
