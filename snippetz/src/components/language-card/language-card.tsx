import classNames from 'classnames';
import styles from './language-card.module.scss';
import Image from 'next/image';

export interface LanguageCardProps {
    className?: string;
    languageID: number;
    languageName: string;
    languageIcon: string;
    languageSnippetCount: number;
}

// Create a context to dynamically import all icons
const iconsContext = require.context('@/icons', false, /\.(png|jpe?g|svg)$/);

export const LanguageCard = ({ className, languageID, languageSnippetCount, languageIcon, languageName }: LanguageCardProps) => {
    let iconSrc: string;
    try {
        // Try to get the specified icon
        iconSrc = iconsContext(`./${languageIcon}.svg`);
    } catch (e) {
        // If the specified icon is not found, use the default icon
        iconSrc = iconsContext('./icon.svg');
    }

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
            <h1 className={styles.h1Class}>{languageName}</h1>
                <Image height={24} width={24} src={iconSrc} alt="" className={styles.imgLogo} />
                <h1 className={styles.h1Class}>{languageSnippetCount} Snippets</h1>
            </div>
        </div>
    );
};
