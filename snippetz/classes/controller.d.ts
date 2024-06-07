// controller.d.ts

import { ProjectType, LanguageType, SnippetType } from '@/types/types';

declare function getAllProjects(): Promise<ProjectType[]>;
declare function getAllLanguages(): Promise<LanguageType[]>;
declare function getAllSnippets(): Promise<SnippetType[]>;

declare function getRecentSnippets(): Promise<SnippetType[]>;

declare function getSnippets(language: string): Promise<SnippetType[]>;
declare function getProjects(): Promise<ProjectType[]>;
declare function getLanguages(project: string): Promise<LanguageType[]>;

declare function getSnippet(snippetId: number): Promise<SnippetType>;
declare function getProject(projectName: string): Promise<ProjectType>;
declare function getLanguage(languageId: number): Promise<LanguageType>;

declare function getProjectSnippets(projectName: string): Promise<SnippetType[]>;

declare function createSnippet(data: SnippetType): Promise<SnippetType>;
declare function createProject(data: ProjectType): Promise<ProjectType>;
declare function createLanguage(data: LanguageType): Promise<LanguageType>;

declare function addLanguage(projectId: number, data: LanguageType): Promise<ProjectType>;

declare function deleteSnippet(snippetId: number, programmingLanguage: string): Promise<void>;
declare function updateSnippet(programmingLanguage: string, snippetName: string, data: SnippetType): Promise<SnippetType>;


export { 
    getAllSnippets, 
    getAllProjects, 
    getAllLanguages, 
    getProject, 
    getSnippet, 
    getLanguage, 
    getSnippets, 
    getRecentSnippets, 
    getProjectSnippets,
    createSnippet, 
    createProject, 
    createLanguage,
    addLanguage,
    deleteSnippet,
    updateSnippet, 
};
