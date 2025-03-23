/**
 * @file This handles calls for the Snippets.
 * @autor Joshua Goodman
 */

/**
 * This is an asynchronous GET request for a single Snippet by name.
 *
 * @param {string} snippetName - The name of the snippet to retrieve.
 */
async function getSnippet(snippetName) {
  try {
    const response = await fetch(`http://localhost:4000/api/snippets/${snippetName}`);
    if (!response.ok) throw new Error('Snippet not found');
    const snippet = await response.json();
    console.log(snippet);
    return snippet;
  } catch (error) {
    console.error('Error fetching snippet:', error);
  }
}

/**
 * This is an asynchronous GET request for all snippets.
 */
async function getRecentSnippets() {
  try {
    const response = await fetch(`http://localhost:4000/api/snippets/recent`);
    if (!response.ok) throw new Error('Error fetching snippets');
    const snippets = await response.json();
    console.log(snippets);
    return snippets;
  } catch (error) {
    console.error('Error fetching snippets:', error);
  }
}

/**
 * This is an asynchronous GET request for Snippets by language.
 *
 * @param {string} language - The language to retrieve snippets for.
 */
async function getSnippetsByLanguage(language) {
  try {
    const response = await fetch(`http://localhost:4000/api/snippets/language/${language}`);
    if (!response.ok) throw new Error('Error fetching snippets by language');
    const snippets = await response.json();
    console.log(snippets);
    return snippets;
  } catch (error) {
    console.error('Error fetching snippets by language:', error);
  }
}

/**
 * This is an asynchronous POST request to create a new Snippet.
 *
 * @param {Object} data - The data for the new snippet.
 */
async function createSnippet(data) {
  try {
    const response = await fetch('http://localhost:4000/api/snippets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error creating snippet');
    const newSnippet = await response.json();
    console.log(newSnippet);
    return newSnippet;
  } catch (error) {
    console.error('Error creating snippet:', error);
  }
}

/**
 * This is an asynchronous PUT request to update an existing Snippet.
 *
 * @param {string} snippetName - The name of the snippet to update.
 * @param {Object} data - The updated data for the snippet.
 */
async function updateSnippet(snippetName, data) {
  try {
    const response = await fetch(`http://localhost:4000/api/snippets/${snippetName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error updating snippet');
    const updatedSnippet = await response.json();
    console.log(updatedSnippet);
    return updatedSnippet;
  } catch (error) {
    console.error('Error updating snippet:', error);
  }
}

/**
 * This is an asynchronous DELETE request to delete a Snippet.
 *
 * @param {string} snippetName - The name of the snippet to delete.
 */
async function deleteSnippet(snippetName) {
  try {
    const response = await fetch(`http://localhost:4000/api/snippets/${snippetName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Error deleting snippet');
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error deleting snippet:', error);
  }
}

export {
  getSnippet,
  getRecentSnippets,
  getSnippetsByLanguage,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};
