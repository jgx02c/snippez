import classNames from 'classnames';
import styles from './language-card.module.scss';
import { LanguageType } from '@/types/types';

export interface LanguageCardProps {
    className?: string;
    languageID: number;
    languageName: string;
    languageIcon: string;
    languageSnippetCount: number;
}

export const LanguageCard = ({ className, languageID, languageSnippetCount, languageIcon, languageName }: LanguageCardProps) => {
    return <div className={classNames(styles.root, className)}>
    <div className={styles.divMain}>
        <img src={languageIcon} alt="" className={styles.imgLogo} />
        <h1 className={styles.h1Class}>{languageName}</h1>
        <h1 className={styles.h1Class}>{languageSnippetCount}</h1>
    </div>
</div>;
};