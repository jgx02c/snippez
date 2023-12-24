/**
 * @file This handles calls for the Projects.
 * @author Joshua Goodman
 */

/*
 * This is an asynchronous GET request for all Projects.
 *
 */
async function getAllSnippets(id) {
    const response_getAllSnippets = await fetch( `http://127.0.0.1:8000/recordings/` + id);
    const snippets = response_getAllSnippets.json();
    console.log( snippets );
    return snippets;
  }


  async function getSnippet( id ) {
    const response_getSnippet = await fetch( "http://127.0.0.1:8000/recordings/" + id );
    const project = response_getSnippet.json();
    console.log( project );
    return project;
  }

  async function getFilteredSnippets( id, filter) {
    const response_getFilteredSnippets = await fetch( "http://127.0.0.1:8000/recordings/" + id + filter );
    const filteredSnippets = response_getFilteredSnippets.json();
    console.log( filteredSnippets );
    return filteredSnippets;
  }

export {
    getAllSnippets,
    getSnippet,
    getFilteredSnippets,
};