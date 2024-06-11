const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Language = require('../models/Language');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Endpoint to get all languages
router.get('/', async (req, res) => {
  try {
    const languagesData = await Language.find();
    res.json(languagesData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get a language by name
router.get('/:languageName', async (req, res) => {
  const { name } = req.params;
  console.log(`Fetching language with name: ${name}`);
  try {
    await client.connect();
    const database = client.db('Snippets');
    const collection = database.collection(name);

    const languageDocuments = await collection.find().toArray();

    if (!languageDocuments.length) {
      console.log('Language not found');
      return res.status(404).send('Language not found');
    }

    console.log(`Found documents: ${JSON.stringify(languageDocuments)}`);
    res.json(languageDocuments);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

// Endpoint to create a new language
router.post('/create', async (req, res) => {
  const { languageName, languageIcon, languageSnippetCount } = req.body;

  if (!languageName || !languageIcon || languageSnippetCount === undefined) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await client.connect();
    const database = client.db('Snippets');

    const collections = await database.listCollections().toArray();
    if (collections.some(col => col.name.toLowerCase() === languageName.toLowerCase())) {
      return res.status(400).send('Collection already exists');
    }

    await database.createCollection(languageName);

    const newLanguage = new Language({
      languageName,
      languageIcon,
      languageSnippetCount
    });

    await newLanguage.save();

    res.status(201).send('Language created successfully');
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
