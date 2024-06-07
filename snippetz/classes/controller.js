/**
 * @file This contains controlling methods.
 * @author Joshua Goodman
 */

import * as projectHandler from "./handlers/projectHandler";
import * as snippetHandler from "./handlers/snippetHandler";
import * as languageHandler from "./handlers/languageHandler";

/*
 * This is an asynchronous request that produces the list of results
 */
async function getAllProjects() {
    const arrayOfProjects = await projectHandler.getAllProjects();
    console.log(arrayOfProjects + "controller");
    return arrayOfProjects;
}

async function getAllLanguages() {
    const arrayOfLanguages = await languageHandler.getAllLanguages();
    console.log(arrayOfLanguages + "controller");
    return arrayOfLanguages;
}

async function getAllSnippets() {
    const arrayOfSnippets = await snippetHandler.getAllSnippets();
    console.log(arrayOfSnippets + "controller");
    return arrayOfSnippets;
}

async function createProject(data) {
    const newProject = await projectHandler.createProject(data);
    console.log(newProject + "controller");
    return newProject;
}

async function createSnippet(data) {
    const newSnippet = await snippetHandler.createSnippet(data);
    console.log(newSnippet + "controller");
    return newSnippet;
}

async function createLanguage(data) {
    const newLanguage = await languageHandler.createLanguage(data);
    console.log(newLanguage + "controller");
    return newLanguage;
}

async function addLanguage(projectId, data) {
    const updatedProject = await projectHandler.addLanguage(projectId, data);
    console.log(updatedProject + "controller");
    return updatedProject;
}

/*
 * This is an asynchronous request that produces the list result
 */
async function getProject(projectName) {
    const project = await projectHandler.getProject(projectName);
    console.log(project + "controller");
    return project;
}

async function getLanguage(languageId) {
    const language = await languageHandler.getLanguage(languageId);
    console.log(language + "controller");
    return language;
}

async function getSnippet(snippetId) {
    const snippet = await snippetHandler.getSnippet(snippetId);
    console.log(snippet + "controller");
    return snippet;
}

async function deleteSnippet(snippetId, programmingLanguage) {
    const snippet = await snippetHandler.deleteSnippet(snippetId, programmingLanguage);
    console.log(snippet + "controller");
    return snippet;
}

async function updateSnippet(programmingLanguage, snippetName, data) {
    const updatedSnippet = await snippetHandler.updateSnippet(programmingLanguage, snippetName, data);
    console.log(updatedSnippet + "controller");
    return updatedSnippet;
}

async function getSnippets(language) {
    const arrayOfSnippets = await snippetHandler.getSnippets(language);
    console.log(arrayOfSnippets + "controller");
    return arrayOfSnippets;
}

async function getRecentSnippets() {
    const arrayOfSnippets = await snippetHandler.getRecentSnippets();
    console.log(arrayOfSnippets + "controller");
    return arrayOfSnippets;
}

async function getProjectSnippets(projectName) {
    const projectSnippets = await projectHandler.getProjectSnippets(projectName);
    console.log(projectSnippets + "controller");
    return projectSnippets;
}

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