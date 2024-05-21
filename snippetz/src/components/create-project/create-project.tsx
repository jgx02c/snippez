import classNames from 'classnames';
import styles from './create-project.module.scss';

export interface CreateProjectProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const CreateProject = ({ className }: CreateProjectProps) => {
    return <div className={classNames(styles.root, className)}>CreateProject</div>;
};
