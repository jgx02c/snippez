// controller.d.ts

interface SnippetType {
  snippetID: number;
  typeID: string;
  snippetName: string;
  snippetDescription: string;
  snippetCodes: string[];
  snippetWriteups: string[];
  snippetPicture: string;
  snippetDate: string;
  snippetSource: string;
  snippetNumberOfProjectsUsed: number;
}

interface ProjectType {
  projectID: number;
  userID: number;
  status: string;
  collaboration: boolean;
  collaborationID: number;
  uploadDate: string;
  projectDueDate: string;
  projectName: string;
}


interface LanguageType {
  languageID: number;
  creationDate: string;
  snippetCount: string;
}

declare function getProjects(): Promise<ProjectType[]>;
declare function getLanguages() : Promise<LanguageType[]>;


declare function getSnippets(summaryID: number): Promise<SnippetType[]>;

declare function getSnippet(projectId: number): Promise<SnippetType[]>;
declare function getProject(projectId: number): Promise<ProjectType[]>;


declare function postCreateSnippet(id: number, localAnalysis: SnippetType[]): Promise<SnippetType[]>;
declare function postCreateProject(id: number, localAnalysis: ProjectType[]): Promise<ProjectType[]>;

export { getSnippets, getProjects, getProject, getSnippet, getLanguages, };
   



