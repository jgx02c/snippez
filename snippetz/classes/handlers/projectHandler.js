/**
 * @file This handles calls for the Projects.
 * @autor Joshua Goodman
 */

/**
 * This is an asynchronous GET request for all Projects.
 */
async function getAllProjects() {
  const response_getAllProjects = await fetch("http://localhost:4000/api/projects");
  const projects = await response_getAllProjects.json();
  console.log(projects);
  return projects;
}

/**
 * This is an asynchronous GET request for a specific Project by name.
 */
async function getProject(projectName) {
  const response_getProject = await fetch(`http://localhost:4000/api/projects/${projectName}`);
  const project = await response_getProject.json();
  console.log(project);
  return project;
}

/**
 * This is an asynchronous GET request for filtered Projects.
 */
async function getFilteredProjects(filter, filterType) {
  const response_getFilteredProjects = await fetch(`http://localhost:4000/api/projects/filter/${filter}/${filterType}`);
  const filteredProjects = await response_getFilteredProjects.json();
  console.log(filteredProjects);
  return filteredProjects;
}

/**
 * This is an asynchronous POST request to create a new Project.
 */
async function createProject(data) {
  const response_createProject = await fetch(`http://localhost:4000/api/projects/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newProject = await response_createProject.json();
  console.log(newProject);
  return newProject;
}

/**
 * This is an asynchronous POST request to add a language to a Project.
 */
async function addLanguage(projectId, data) {
  const response_addLanguage = await fetch(`http://localhost:4000/api/projects/${projectId}/add-language`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const updatedProject = await response_addLanguage.json();
  console.log(updatedProject);
  return updatedProject;
}

/**
 * This is an asynchronous GET request for all snippets in a Project.
 */
async function getProjectSnippets(projectName) {
  const response_getProjectSnippets = await fetch(`http://localhost:4000/api/projects/${projectName}/snippets`);
  const projectSnippets = await response_getProjectSnippets.json();
  console.log(projectSnippets);
  return projectSnippets;
}

export {
  getAllProjects,
  getProject,
  getFilteredProjects,
  createProject,
  addLanguage,
  getProjectSnippets,
};
