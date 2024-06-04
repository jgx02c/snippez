import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './iconmenu.module.scss';
import Image from 'next/image';

// Dynamically import all files from the 'icons' folder
const iconContext = (require as any).context('@/icons', false, /\.(png|jpe?g|svg)$/);
const icons: { src: string, alt: string }[] = iconContext.keys().map((key: string) => ({
  src: iconContext(key).default.src,
  alt: key,
}));

export interface IconMenuProps {
  className?: string;
  onSelectIcon: (icon: string) => void; // Callback to pass selected icon back to the parent component
}

const IconDropdownMenu: React.FC<IconMenuProps> = ({ className, onSelectIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = (icon: string) => {
    onSelectIcon(icon);
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.divMain}>
        <div className={styles.divInput}>
          <input className={styles.inputClass} />
        </div>
        <div className={styles.divLine}></div>
        <div className={styles.divButtonsWrapper}>
          <div className={styles.divButtons}>
            {icons.map((icon, index) => (
              <button
                key={index}
                className={styles.buttonClass}
                onClick={() => handleIconClick(icon.src)}
              >
                <Image src={icon.src} height={12} width={12} alt={icon.alt} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconDropdownMenu;