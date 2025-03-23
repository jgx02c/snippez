import classNames from 'classnames';
import styles from './code-component.module.scss';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

export interface CodeComponentProps {
    className?: string;
    snippetCode: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const CodeComponent = ({ className, snippetCode }: CodeComponentProps) => {
    const [code, setCode] = React.useState(snippetCode);
    return (
    <div className={classNames(styles.root, className)}>
         <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
    </div>
    );
};
