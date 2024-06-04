// controller.d.ts

import { ProjectType, LanguageType, SnippetType } from '@/types/types';



declare function getAllProjects(): Promise<ProjectType[]>;
declare function getAllLanguages(): Promise<LanguageType[]>;
declare function getAllSnippets(): Promise<SnippetType[]>;

declare function getRecentSnippets(): Promise<SnippetType[]>;

declare function getSnippets(language: string): Promise<SnippetType[]>;
declare function getProjects(): Promise<ProjectType[]>;
declare function getLanguages(project: string): Promise<LanguageType[]>;

declare function getSnippet(snippetId: number): Promise<SnippetType[]>;
declare function getProject(projectName: string): Promise<ProjectType>;
declare function getLanguage(languageId: number): Promise<LanguageType[]>;

declare function getFilteredSnippets(filter: string, filterType: string): Promise<SnippetType[]>;
declare function getFilteredProjects(filter: string, filterType: string): Promise<ProjectType[]>;
declare function getFilteredLanguages(filter: string, filterType: string): Promise<LanguageType[]>;

declare function postCreateSnippet(id: number, localAnalysis: SnippetType[]): Promise<SnippetType[]>;
declare function postCreateProject(id: number, localAnalysis: ProjectType[]): Promise<ProjectType[]>;
declare function postAddLanguage(id: number, localAnalysis: LanguageType[]): Promise<ProjectType[]>;

export { getAllSnippets, getAllProjects, getAllLanguages, getProject, 
            getSnippet, getLanguage, getFilteredSnippets, 
            getFilteredProjects, getFilteredLanguages, getSnippets, getRecentSnippets };
   



