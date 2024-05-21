import classNames from 'classnames';
import styles from './lines.module.scss';
import { LanguageCard } from '../language-card/language-card';

export interface LinesProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */


export const Lines = ({ className }: LinesProps) => {
    return <div className={classNames(styles.root, className)}>
        <span className={styles.spanMain}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="1662" viewBox="0 0 2 1662" fill="none">
                <path d="M1 0L1.00007 1662" stroke="#A141D0" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="4 8" />
            </svg>
        </span>
        <div className={styles.divCenter}>
            <span className={styles.spanCenter}>
                <LanguageCard /></span></div></div>;
};
