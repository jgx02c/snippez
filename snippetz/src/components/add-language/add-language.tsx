import classNames from 'classnames';
import styles from './add-language.module.scss';

export interface AddLanguageProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const AddLanguage = ({ className }: AddLanguageProps) => {
    return <div className={classNames(styles.root, className)}>AddLanguage</div>;
};
