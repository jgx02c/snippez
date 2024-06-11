/**
 * @file This handles calls for the Languages.
 * @autor Joshua Goodman
 */

/**
 * This is an asynchronous GET request for all Languages.
 */
async function getAllLanguages() {
  const response_getAllLanguages = await fetch(`http://localhost:4000/api/languages`);
  const languages = await response_getAllLanguages.json();
  console.log(languages);
  return languages;
}

/**
 * This is an asynchronous GET request for a single Language by ID.
 *
 * @param {number} languageId - The ID of the language to retrieve.
 */
async function getLanguage(languageName) {
  const response_getLanguage = await fetch(`http://localhost:4000/api/languages/${languageName}`);
  const language = await response_getLanguage.json();
  console.log(language);
  return language;
}

/**
 * This is an asynchronous POST request to create a new Language.
 *
 * @param {Object} data - The data for the new language.
 */
async function createLanguage(data) {
  const response_createLanguage = await fetch(`http://localhost:4000/api/languages/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newLanguage = await response_createLanguage.json();
  console.log(newLanguage);
  return newLanguage;
}

export {
  getAllLanguages,
  getLanguage,
  createLanguage,
};
