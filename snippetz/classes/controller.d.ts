// controller.ts

import * as projectHandler from "./handlers/projectHandler";
import * as snippetHandler from "./handlers/snippetHandler";
import * as languageHandler from "./handlers/languageHandler";

async function getAllProjects(): Promise<ProjectType[]> {
    return projectHandler.getAllProjects();
}

async function getAllLanguages(): Promise<LanguageType[]> {
    return languageHandler.getAllLanguages();
}

async function getAllSnippets(): Promise<SnippetType[]> {
    return snippetHandler.getAllSnippets();
}

async function getRecentSnippets(): Promise<SnippetType[]> {
    return snippetHandler.getRecentSnippets();
}

async function getSnippetsByLanguage(language: string): Promise<SnippetType[]> {
    return snippetHandler.getSnippetsByLanguage(language);
}

async function getProjects(): Promise<ProjectType[]> {
    // Implement this if needed
    return [];
}

async function getLanguages(project: string): Promise<LanguageType[]> {
    // Implement this if needed
    return [];
}

async function getSnippet(snippetId: number): Promise<SnippetType> {
    // Implement this if needed
    return {} as SnippetType;
}

async function getProject(projectName: string): Promise<ProjectType> {
    return projectHandler.getProject(projectName);
}

async function getLanguage(languageId: number): Promise<LanguageType> {
    // Implement this if needed
    return {} as LanguageType;
}

async function getProjectSnippets(projectName: string): Promise<SnippetType[]> {
    return projectHandler.getProjectSnippets(projectName);
}

async function createSnippet(data: SnippetType): Promise<SnippetType> {
    return snippetHandler.createSnippet(data);
}

async function createProject(data: ProjectType): Promise<ProjectType> {
    return projectHandler.createProject(data);
}

async function createLanguage(data: LanguageType): Promise<LanguageType> {
    return languageHandler.createLanguage(data);
}

async function addLanguage(projectId: number, data: LanguageType): Promise<ProjectType> {
    // Implement this if needed
    return {} as ProjectType;
}

async function deleteSnippet(programmingLanguage: string, snippetName: string): Promise<void> {
    return snippetHandler.deleteSnippet(programmingLanguage, snippetName);
}

async function updateSnippet(programmingLanguage: string, snippetName: string, data: SnippetType): Promise<SnippetType> {
    return snippetHandler.updateSnippet(programmingLanguage, snippetName, data);
}

export {
    getAllProjects,
    getAllLanguages,
    getAllSnippets,
    getRecentSnippets,
    getSnippetsByLanguage,
    getProjects,
    getLanguages,
    getSnippet,
    getProject,
    getLanguage,
    getProjectSnippets,
    createSnippet,
    createProject,
    createLanguage,
    addLanguage,
    deleteSnippet,
    updateSnippet,
};
