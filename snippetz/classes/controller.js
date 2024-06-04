/**
 * @file This contains controlling methods.
 * @author Joshua Goodman
 */

import * as projectHandler from "./handlers/projectHandler";

import * as snippetHandler from "./handlers/snippetHandler";

import * as languageHandler from "./handlers/languageHandler";

/*
 * This is an asynchronous request that produces the list of results
 *
 */
async function getAllProjects() {
    const arrayOfProjects = await projectHandler.getAllProjects();
    console.log( arrayOfProjects + "controller" );
    return arrayOfProjects;
};

async function getAllLanguages() {
    const arrayOfLanguages = await languageHandler.getAllLanguages();
    console.log( arrayOfLanguages + "controller" );
    return arrayOfLanguages;
};

async function getAllSnippets() {
    const arrayOfSnippets = await snippetHandler.getAllSnippets();
    console.log( arrayOfSnippets + "controller" );
    return arrayOfSnippets;
};


/*
 * This is an asynchronous request that produces the list result
 *
 */
async function getProject(name) {
    const project = await projectHandler.getProject(name);
    console.log( project + "controller" );
    return project;
};

async function getLanguage(id) {
    const language = await languageHandler.getLanguage(id);
    console.log( language + "controller" );
    return language;
};

async function getSnippet(id) {
    const snippet = await snippetHandler.getSnippet(id);
    console.log( snippet + "controller" );
    return snippet;
};

/*
 * This is an asynchronous request that produces an array of filtered results
 *
 */


async function getSnippets(language) {
    const arrayOfSnippets = await snippetHandler.getAllSnippets(language);
    console.log( arrayOfSnippets + "controller" );
    return arrayOfSnippets;
};

async function getRecentSnippets() {
    const arrayOfSnippets = await snippetHandler.getRecentSnippets();
    console.log( arrayOfSnippets + "controller" );
    return arrayOfSnippets;
};


/*
 * This is an asynchronous request that produces an array of filtered results
 *
 */

async function getFilteredProjects(filter, filterType) {
    const arrayOfFilteredProjects = await projectHandler.getAllProjects(filter, filterType);
    console.log( arrayOfFilteredProjects + "controller" );
    return arrayOfFilteredProjects;
};

async function getFilteredLanguages(filter, filterType) {
    const arrayOfFilteredLanguages = await languageHandler.getLanguages(filter, filterType);
    console.log( arrayOfFilteredLanguages + "controller" );
    return arrayOfFilteredLanguages;
};

async function getFilteredSnippets(filter, filterType) {
    const arrayOfFilteredSnippets = await snippetHandler.getAllSnippets(filter, filterType);
    console.log( arrayOfFilteredSnippets + "controller" );
    return arrayOFilteredSnippets;
};


export {
    getAllProjects,
    getAllSnippets,
    getAllLanguages,

    getFilteredSnippets,
    getFilteredProjects,
    getFilteredLanguages,

    getSnippets,
    getRecentSnippets,

    getProject,
    getLanguage,
    getSnippet,
    
}