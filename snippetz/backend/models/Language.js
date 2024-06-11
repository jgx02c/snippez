const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  languageName: String,
  languageIcon: String,
  languageSnippetCount: Number
});

const Language = mongoose.model('Language', languageSchema, 'LanguagesData');

module.exports = Language;
