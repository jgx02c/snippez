// src/components/ChatTerminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './chatterminal.module.scss';
import { ConversationsBar } from '../conversations-bar/conversationsbar';
import { ChatPrompt } from '../chat-prompt/chatprompt';

export const ChatTerminal: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleSendMessage = async (message: string) => {
    setMessages((prevMessages) => [...prevMessages, `User: ${message}`]);

    // Simulate server streaming response
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let serverMessage = '';

    while (true) {
      const { done, value } = await reader?.read() || {};
      if (done) break;
      serverMessage += decoder.decode(value);
      setMessages((prevMessages) => [...prevMessages, `AI: ${serverMessage}`]);
    }
  };

  return (
    <div className={styles.chatTerminal}>
      <div className={classNames(styles.sidebar, { [styles.hidden]: !showSidebar })}>
        <ConversationsBar />
      </div>
      <div className={styles.chatContainer}>
        <button onClick={() => setShowSidebar(!showSidebar)} className={styles.toggleButton}>
          {showSidebar ? 'Hide' : 'Show'} Conversations
        </button>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.message}>
              {msg}
            </div>
          ))}
        </div>
        <ChatPrompt onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
