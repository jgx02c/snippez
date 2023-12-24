/**
 * @file This handles calls for the Projects.
 * @author Joshua Goodman
 */

/*
 * This is an asynchronous GET request for all Projects.
 *
 */
async function getAllProjects() {
    const response_getAllProjects = await fetch( "http://127.0.0.1:8000/projects" );
    const projects = response_getAllProjects.json();
    console.log( projects );
    return projects;
  }


  async function getProject( id ) {
    const response_getProject = await fetch( "http://127.0.0.1:8000/project" + id );
    const project = response_getProject.json();
    console.log( project );
    return project;
  }

  async function getFilteredProjects( id, filter) {
    const response_getFilteredProjects = await fetch( "http://127.0.0.1:8000/filteredproject" + id + filter );
    const filteredProjects = response_getFilteredProjects.json();
    console.log( filteredProjects );
    return filteredProjects;
  }

export {
    getAllProjects,
    getProject,
    getFilteredProjects,
};