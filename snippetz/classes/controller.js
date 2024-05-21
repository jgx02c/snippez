/**
 * @file This contains controlling methods.
 * @author Joshua Goodman
 */

import * as projectHandler from "./handlers/projectHandler";

import * as snippetHandler from "./handlers/snippetHandler";

import * as languageHandler from "./handlers/languageHandler";

/*
 * This is an asynchronous request that produces an array of User Projects
 *
 */
async function getProjects() {
    const arrayOfProjects = await projectHandler.getAllProjects();
    console.log( arrayOfProjects + "controller" );
    return arrayOfProjects;
};

async function getLanguages() {
    const arrayOfLanguages = await languageHandler.getLanguages();
    console.log( arrayOfLanguages + "controller" );
    return arrayOfLanguages;
};

async function getSnippets(id) {
    const arrayOfSnippets = await snippetHandler.getAllSnippets(id);
    console.log( arrayOfSnippets + "controller" );
    return arrayOfSnippets;
};


export {
    getProjects,
    getSnippets,

    getLanguages,

}