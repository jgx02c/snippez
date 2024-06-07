/**
 * @file This handles calls for the Snippets.
 * @autor Joshua Goodman
 */

/**
 * This is an asynchronous GET request for all Snippets.
 */
async function getAllSnippets() {
  const response_getAllSnippets = await fetch(`http://localhost:4000/api/snippets`);
  const snippets = await response_getAllSnippets.json();
  console.log(snippets);
  return snippets;
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
 * This is an asynchronous GET request for Snippets by language.
 *
 * @param {string} language - The language to retrieve snippets for.
 */
async function getSnippets(language) {
  const response_getSnippets = await fetch(`http://localhost:4000/api/snippets/language/${language}`);
  const snippets = await response_getSnippets.json();
  console.log(snippets);
  return snippets;
}

/**
 * This is an asynchronous GET request for recent Snippets.
 */
async function getRecentSnippets() {
  const response_getRecentSnippets = await fetch(`http://localhost:4000/api/recent-snippets`);
  const snippets = await response_getRecentSnippets.json();
  console.log(snippets);
  return snippets;
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

/**
 * This is an asynchronous POST request to create a new Snippet.
 *
 * @param {Object} data - The data for the new snippet.
 */
async function createSnippet(data) {
  const response_createSnippet = await fetch(`http://localhost:4000/api/snippets/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newSnippet = await response_createSnippet.json();
  console.log(newSnippet);
  return newSnippet;
}

/**
 * This is an asynchronous PUT request to update an existing Snippet.
 *
 * @param {string} programmingLanguage - The programming language of the snippet.
 * @param {string} snippetName - The name of the snippet to update.
 * @param {Object} data - The updated data for the snippet.
 */
async function updateSnippet(programmingLanguage, snippetName, data) {
  const response_updateSnippet = await fetch(`http://localhost:4000/api/snippets/${snippetName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const updatedSnippet = await response_updateSnippet.json();
  console.log(updatedSnippet);
  return updatedSnippet;
}

/**
 * This is an asynchronous DELETE request to delete a Snippet.
 *
 * @param {number} snippetID - The ID of the snippet to delete.
 * @param {string} programmingLanguage - The programming language of the snippet.
 */
async function deleteSnippet(snippetID, programmingLanguage) {
  const response = await fetch(`http://localhost:4000/api/snippets/${snippetID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ programmingLanguage }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete snippet');
  }

  return response.json();
}

export {
  getAllSnippets,
  getSnippet,
  getSnippets,
  getRecentSnippets,
  getFilteredSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};
