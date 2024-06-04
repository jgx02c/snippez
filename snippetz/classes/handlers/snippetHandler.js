/**
 * @file This handles calls for the Snippets.
 * @autor Joshua Goodman
 */

/**
 * This is an asynchronous GET request for all Snippets.
 *
 * @param {number} id - The ID of the project to retrieve snippets for.
 */
async function getAllSnippets(id) {
  const response_getAllSnippets = await fetch(`http://localhost:4000/api/snippets/${id}`);
  const snippets = await response_getAllSnippets.json();
  console.log(snippets);
  return snippets;
}

/**
 * This is an asynchronous GET request for a single Snippet by ID.
 *
 * @param {number} id - The ID of the snippet to retrieve.
 */
async function getSnippets(language) {
  const response_getSnippet = await fetch(`http://localhost:4000/api/snippets/${language}`);
  const snippet = await response_getSnippet.json();
  console.log(snippet);
  return snippet;
}
/**
 * This is an asynchronous GET request for a single Snippet by ID.
 *
 * @param {number} id - The ID of the snippet to retrieve.
 */
async function getRecentSnippets() {
  const response_getSnippet = await fetch(`http://localhost:4000/api/recent-snippets`);
  const snippet = await response_getSnippet.json();
  console.log(snippet);
  return snippet;
}


/**
 * This is an asynchronous GET request for a single Snippet by ID.
 *
 * @param {number} id - The ID of the snippet to retrieve.
 */
async function getSnippet(id) {
  const response_getSnippet = await fetch(`http://localhost:4000/api/snippets/${id}`);
  const snippet = await response_getSnippet.json();
  console.log(snippet);
  return snippet;
}

/**
 * This is an asynchronous GET request for filtered Snippets.
 *
 * @param {string} filter - The attribute to filter by (e.g., 'programmingLanguage', 'snippetName').
 * @param {string} filterType - The value to filter by.
 */
async function getFilteredSnippets(filter, filterType) {
  const response_getFilteredSnippets = await fetch(`http://localhost:4000/api/snippets/filter/${filter}/${filterType}`);
  const filteredSnippets = await response_getFilteredSnippets.json();
  console.log(filteredSnippets);
  return filteredSnippets;
}

export {
  getAllSnippets,
  getSnippet,
  getSnippets,
  getRecentSnippets,
  getFilteredSnippets,
};
