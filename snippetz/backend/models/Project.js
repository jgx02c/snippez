const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  dateCreated: String,
  lastDateModified: String,
  projectName: String,
  projectSnippets: [{
    language: {
      languageName: String,
      languageIcon: String,
      languageSnippetCount: Number
    },
    snippets: [{
      dateCreated: String,
      lastDateModified: String,
      programmingLanguage: String,
      codeArray: [String],
      writeUp: [String],
      snippetDescription: String,
      snippetSource: String,
      snippetSourceLinks: [String],
      snippetName: String
    }]
  }]
});

const Project = mongoose.model('Project', projectSchema, 'Projects');

module.exports = Project;
