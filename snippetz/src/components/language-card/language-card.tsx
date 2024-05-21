import classNames from 'classnames';
import styles from './language-card.module.scss';

export interface LanguageCardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const LanguageCard = ({ className }: LanguageCardProps) => {
    return <div className={classNames(styles.root, className)}>
    <div className={styles.divMain}>
        <img src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg" alt="" className={styles.imgLogo} />
        <h1 className={styles.h1Class}>Language</h1>
        <h1 className={styles.h1Class}># of Snippets</h1>
    </div>
</div>;
};

