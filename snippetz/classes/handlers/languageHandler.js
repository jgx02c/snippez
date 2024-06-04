/**
 * @file This handles calls for the Languages.
 * @author Joshua Goodman
 */

/**
 * This is an asynchronous GET request for all Languages.
 *
 */
async function getAllLanguages() {
  const response_getAllLanguages = await fetch("http://localhost:4000/api/languages");
  const languages = await response_getAllLanguages.json();
  console.log(languages);
  return languages;
}

/**
 * This is an asynchronous GET request for a single Language by ID.
 *
 * @param {number} id - The ID of the language to retrieve.
 */
async function getLanguage(id) {
  const response_getLanguage = await fetch(`http://localhost:4000/api/languages/${id}`);
  const language = await response_getLanguage.json();
  console.log(language);
  return language;
}

/**
 * This is an asynchronous GET request for filtered Languages.
 *
 * @param {string} filter - The attribute to filter by (e.g., 'name', 'snippetCount').
 * @param {string} filterType - The value to filter by.
 */
async function getFilteredLanguages(filter, filterType) {
  const response_getFilteredLanguages = await fetch(`http://localhost:4000/api/languages/filter/${filter}/${filterType}`);
  const filteredLanguages = await response_getFilteredLanguages.json();
  console.log(filteredLanguages);
  return filteredLanguages;
}

export {
  getAllLanguages,
  getLanguage,
  getFilteredLanguages,
};
