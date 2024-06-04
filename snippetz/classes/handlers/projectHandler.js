/**
 * @file This handles calls for the Projects.
 * @author Joshua Goodman
 */

/**
 * This is an asynchronous GET request for all Projects.
 *
 */
async function getAllProjects() {
  const response_getAllProjects = await fetch("http://localhost:4000/api/projects");
  const projects = await response_getAllProjects.json();
  console.log(projects);
  return projects;
}

/**
 * This is an asynchronous GET request for a single Project by ID.
 *
 * @param {number} id - The ID of the project to retrieve.
 */
async function getProject(name) {
  const response_getProject = await fetch(`http://localhost:4000/api/projects/${name}`);
  const project = await response_getProject.json();
  console.log(project);
  return project;
}

/**
 * This is an asynchronous GET request for filtered Projects.
 *
 * @param {string} filter - The attribute to filter by (e.g., 'name', 'dateCreated').
 * @param {string} filterType - The value to filter by.
 */
async function getFilteredProjects(filter, filterType) {
  const response_getFilteredProjects = await fetch(`http://localhost:4000/api/projects/filter/${filter}/${filterType}`);
  const filteredProjects = await response_getFilteredProjects.json();
  console.log(filteredProjects);
  return filteredProjects;
}

export {
  getAllProjects,
  getProject,
  getFilteredProjects,
};
