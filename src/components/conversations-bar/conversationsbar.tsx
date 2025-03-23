// src/components/ConversationsBar.tsx
import React from 'react';
import styles from './conversations.module.scss';

export const ConversationsBar: React.FC = () => {
  return (
    <div className={styles.conversationsBar}>
      <h2>Previous Conversations</h2>
      <ul>
        <li>Conversation 1</li>
        <li>Conversation 2</li>
        {/* Add more conversations here */}
      </ul>
    </div>
  );
};
