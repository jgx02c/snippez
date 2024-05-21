import classNames from 'classnames';
import styles from './home-board.module.scss';
import { ProgrammingLanguagesList } from '@/components/programmingLanguageList/programminglanguageslist';


export interface HomeBoardProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */


export const HomeBoard = ({ className }: HomeBoardProps) => {
    return <div className={classNames(styles.root, className)}>
        <ProgrammingLanguagesList />
    </div>;
};
