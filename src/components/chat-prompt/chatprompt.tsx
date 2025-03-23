// src/components/ChatPrompt.tsx
import React, { useState } from 'react';
import styles from './ChatPrompt.module.scss';

interface ChatPromptProps {
  onSendMessage: (message: string) => void;
}

export const ChatPrompt: React.FC<ChatPromptProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className={styles.chatPrompt}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
