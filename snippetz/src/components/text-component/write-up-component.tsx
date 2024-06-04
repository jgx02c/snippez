import classNames from 'classnames';
import styles from './write-up-component.module.scss';

export interface WriteUpComponentProps {
    className?: string;
    writeup: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const WriteUpComponent = ({ className }: WriteUpComponentProps) => {
    return <div className={classNames(styles.root, className)}>WriteUpComponent</div>;
};
