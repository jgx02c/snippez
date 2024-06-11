const mongoose = require('mongoose');

const recentSchema = new mongoose.Schema({
  recentSnippets: [{
    snippetName: String,
    language: String
  }]
});

const Recent = mongoose.model('Recent', recentSchema, 'Recent');

module.exports = Recent;
