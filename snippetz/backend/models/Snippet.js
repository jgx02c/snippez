const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  dateCreated: String,
  lastDateModified: String,
  programmingLanguage: String,
  codeArray: [String],
  writeUp: [String],
  snippetDescription: String,
  snippetSource: String,
  snippetSourceLinks: [String],
  snippetName: String
});

const Snippet = mongoose.model('Snippet', snippetSchema, 'Snippets');

module.exports = Snippet;
