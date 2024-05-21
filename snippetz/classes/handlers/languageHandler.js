/**
 * @file This handles calls for the Languages.
 * @author Joshua Goodman
 */

/*
 * This is an asynchronous GET request for all Projects.
 *
 */
async function getLanguages() {
    const response_getAllLanguages = await fetch( "http://127.0.0.1:8000/languages/" );
    const languages = response_getAllLanguages.json();
    console.log( languages );
    return languages;
  }


  async function getLanguage( id ) {
    const response_getLanguage = await fetch( "http://127.0.0.1:8000/language/" + id );
    const language = response_getLanguage.json();
    console.log( language );
    return language;
  }

  async function getFilteredLanguages( id, filter) {
    const response_getFilteredLanguages = await fetch( "http://127.0.0.1:8000/filteredlanguages/" + id + filter );
    const filteredProjects = response_getFilteredLanguages.json();
    console.log( filteredProjects );
    return filteredProjects;
  }

export {
    getLanguages,
    getLanguage,
    getFilteredLanguages,
};