export interface ProjectType {
  projectID: number;
  dateCreated: string;
  lastDateModified: string;
  projectName: string;
  projectSnippets: {
    language: LanguageType;
    snippets: SnippetType[];
  }[];
}

export interface LanguageType {
    languageID: number;
    languageName: string;
    languageIcon: string;
    languageSnippetCount: number;
  }

export interface SnippetType {
    snippetID: number;
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