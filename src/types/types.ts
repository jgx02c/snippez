export interface ProjectType {
  dateCreated: string;
  lastDateModified: string;
  projectName: string;
  projectSnippets: {
    language: LanguageType;
    snippets: SnippetType[];
  }[];
}

export interface LanguageType {
    languageName: string;
    languageIcon: string;
    languageSnippetCount: number;
  }

export interface SnippetType {
    dateCreated: string;
    lastDateModified: string;
    programmingLanguage: string;
    codeArray: string[];
    writeUp: string[];
    snippetDescription: string;
    snippetSource: string;
    snippetSourceLinks: string[];
    snippetName: string;
}