const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Snippet = require('../models/Snippet');
const Recent = require('../models/Recent'); // Import the Recent model

// Endpoint to get all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get a snippet by name
router.get('/:snippetName', async (req, res) => {
  const { snippetName } = req.params;
  try {
    const snippet = await Snippet.findOne({ snippetName });
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get recent snippets
router.get('/recent', async (req, res) => {
  try {
    const recent = await Recent.findOne();
    if (!recent || !recent.recentSnippets) {
      return res.status(404).send('No recent snippets found');
    }

    const snippets = [];
    for (const recentSnippet of recent.recentSnippets) {
      const snippet = await Snippet.findOne({ snippetName: recentSnippet.snippetName });
      if (snippet) {
        snippets.push(snippet);
      }
    }

    res.json(snippets);
  } catch (err) {
    res.status(500).send(err);
  }
});
  

// Endpoint to get snippets by programming language
router.get('/language/:language', async (req, res) => {
  const { language } = req.params;
  try {
    const snippets = await Snippet.find({ programmingLanguage: language });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to create a new snippet
router.post('/create', async (req, res) => {
  const {
    dateCreated,
    lastDateModified,
    programmingLanguage,
    codeArray,
    writeUp,
    snippetDescription,
    snippetSource,
    snippetSourceLinks,
    snippetName
  } = req.body;

  if (!dateCreated || !lastDateModified || !programmingLanguage || !codeArray || !writeUp || !snippetDescription || !snippetSource || !snippetSourceLinks || !snippetName) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await client.connect();
    const database = client.db('Snippets');

    // Check if the collection already exists
    const collections = await database.listCollections().toArray();
    if (!collections.some(col => col.name.toLowerCase() === programmingLanguage.toLowerCase())) {
      // Create the collection if it doesn't exist
      await database.createCollection(programmingLanguage);
    }

    // Insert the snippet into the appropriate collection
    const snippet = {
      dateCreated,
      lastDateModified,
      programmingLanguage,
      codeArray,
      writeUp,
      snippetDescription,
      snippetSource,
      snippetSourceLinks,
      snippetName
    };

    await database.collection(programmingLanguage).insertOne(snippet);

    res.status(201).send('Snippet created successfully');
  } catch (err) {
    console.error('Error creating snippet:', err);
    res.status(500).send('Error creating snippet');
  } finally {
    await client.close();
  }
});

// Endpoint to update a snippet by name
router.put('/:snippetName', async (req, res) => {
  const { snippetName } = req.params;
  const updatedSnippet = req.body;

  try {
      await client.connect();
      const database = client.db('Snippets');
      const collectionName = updatedSnippet.programmingLanguage;
      const result = await database.collection(collectionName).updateOne(
          { snippetName },
          { $set: updatedSnippet }
      );

      if (result.matchedCount === 0) {
          return res.status(404).send('Snippet not found');
      }

      res.status(200).send('Snippet updated successfully');
  } catch (err) {
      console.error('Error updating snippet:', err);
      res.status(500).send('Error updating snippet');
  } finally {
      await client.close();
  }
});

// Endpoint to delete a snippet by name
router.delete('/:snippetName', async (req, res) => {
  const { snippetName } = req.params;
  const { programmingLanguage } = req.body;

  try {
    await client.connect();
    const database = client.db('Snippets');
    const result = await database.collection(programmingLanguage).deleteOne({ snippetName });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (err) {
    console.error('Error deleting snippet:', err);
    res.status(500).json({ error: 'Error deleting snippet' });
  } finally {
    await client.close();
  }
});

module.exports = router;
