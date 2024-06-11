// controller.ts

import * as projectHandler from "./handlers/projectHandler";
import * as snippetHandler from "./handlers/snippetHandler";
import * as languageHandler from "./handlers/languageHandler";

async function getAllProjects() {
    return await projectHandler.getAllProjects();
}

async function getAllLanguages() {
    return await languageHandler.getAllLanguages();
}

async function getAllSnippets() {
    return await snippetHandler.getAllSnippets();
}

async function createProject(data) {
    return await projectHandler.createProject(data);
}

async function createSnippet(data) {
    return await snippetHandler.createSnippet(data);
}

async function createLanguage(data) {
    return await languageHandler.createLanguage(data);
}

async function addLanguage(projectName, data) {
    return await projectHandler.addLanguage(projectName, data);
}

async function getProject(projectName) {
    return await projectHandler.getProject(projectName);
}

async function getLanguage(languageName) {
    return await languageHandler.getLanguage(languageName);
}

async function getSnippet(snippetName) {
    return await snippetHandler.getSnippet(snippetName);
}

async function deleteSnippet(programmingLanguage, snippetName) {
    return await snippetHandler.deleteSnippet(programmingLanguage, snippetName);
}

async function updateSnippet(programmingLanguage, snippetName, data) {
    return await snippetHandler.updateSnippet(programmingLanguage, snippetName, data);
}

async function getSnippetsByLanguage(languageName) {
    return await snippetHandler.getSnippetsByLanguage(languageName);
}

async function getRecentSnippets() {
    return await snippetHandler.getRecentSnippets();
}

async function getProjectSnippets(projectName) {
    return await projectHandler.getProjectSnippets(projectName);
}

export {
    getAllProjects,
    getProject,
    createProject,
    addLanguage,
    createSnippet,
    getProjectSnippets,
    getAllLanguages,
    getLanguage,
    createLanguage,
    getSnippet,
    getRecentSnippets,
    getSnippetsByLanguage,
    deleteSnippet,
    updateSnippet,
};
