// src/pages/ChatPage.tsx
import React from 'react';
import { ChatTerminal } from '../../components/chat-terminal/chatterminal';
import styles from './gpt.module.scss';

const GPT: React.FC = () => {
  return (
    <div className={styles.chatPage}>
      <ChatTerminal />
    </div>
  );
};

export default GPT;
