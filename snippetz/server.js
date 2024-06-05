const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const app = express();
const port = 4000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/Snippets';

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB with Mongoose');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Define Mongoose schemas and models
const languageSchema = new mongoose.Schema({
  languageID: Number,
  languageName: String,
  languageIcon: String,
  languageSnippetCount: Number
});

const Language = mongoose.model('Language', languageSchema, 'LanguagesData');

const projectSchema = new mongoose.Schema({
  projectID: Number,
  dateCreated: String,
  lastDateModified: String,
  projectName: String,
  projectSnippets: [{
    language: String,
    snippets: [String]
  }]
});

const Project = mongoose.model('Project', projectSchema, 'Projects');

const recentSchema = new mongoose.Schema({
  recentSnippets: [{
    snippetName: String,
    language: String
  }]
});

const Recent = mongoose.model('Recent', recentSchema, 'Recent');

const snippetSchema = new mongoose.Schema({
  snippetID: Number,
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

// Define MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Endpoint to get all languages from LanguagesData collection
app.get('/api/languages', async (req, res) => {
  try {
    const languagesData = await Language.find();
    res.json(languagesData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get snippets by language
app.get('/api/snippets/:language', async (req, res) => {
  const { language } = req.params;
  try {
    await client.connect();
    const database = client.db('Snippets');
    const snippets = await database.collection(language).find().toArray();
    if (snippets.length > 0) {
      res.json(snippets);
    } else {
      res.status(404).send('Snippets not found');
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

// Endpoint to get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get a project by name with languages and snippets
app.get('/api/projects/:projectName', async (req, res) => {
  const { projectName } = req.params;
  try {
    const project = await Project.findOne({ projectName: projectName });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    await client.connect();
    const database = client.db('Snippets');

    // Fetch snippets and language details for each language in the project
    const projectSnippets = await Promise.all(
      project.projectSnippets.map(async ({ language, snippets }) => {
        const languageDetails = await Language.findOne({ languageName: language });
        const snippetsDetails = await Promise.all(
          snippets.map(async snippetName => {
            const snippet = await database.collection(language).findOne({ snippetName });
            return snippet;
          })
        );

        return {
          language: languageDetails,
          snippets: snippetsDetails.filter(snippet => snippet !== null)
        };
      })
    );

    const projectDetails = {
      ...project.toObject(),
      projectSnippets: projectSnippets
    };

    res.json(projectDetails);
  } catch (err) {
    console.error('Error retrieving project details:', err);
    res.status(500).send('Error retrieving project details');
  } finally {
    await client.close();
  }
});

// Endpoint to get a snippet by name across all collections
app.get('/api/snippet/:snippetName', async (req, res) => {
  const { snippetName } = req.params;
  try {
    await client.connect();
    const database = client.db('Snippets');
    const collections = await database.listCollections().toArray();

    let snippet = null;

    for (const collection of collections) {
      snippet = await database.collection(collection.name).findOne({ snippetName: snippetName });
      if (snippet) {
        break;
      }
    }

    if (snippet) {
      res.json(snippet);
    } else {
      res.status(404).send('Snippet not found');
    }
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

// Endpoint to get recent snippets
app.get('/api/recent-snippets', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Snippets');

    const recent = await Recent.findOne();
    if (!recent || !recent.recentSnippets) {
      return res.status(404).send('No recent snippets found');
    }

    const snippets = [];
    for (const recentSnippet of recent.recentSnippets) {
      const snippet = await database.collection(recentSnippet.language).findOne({ snippetName: recentSnippet.snippetName });
      if (snippet) {
        snippets.push(snippet);
      }
    }

    res.json(snippets);
  } catch (err) {
    res.status(500).send(err);
  } finally {
    await client.close();
  }
});

// Endpoint to create a new language
app.post('/api/languages/create', async (req, res) => {
  const { languageID, languageName, languageIcon, languageSnippetCount } = req.body;

  if (!languageID || !languageName || !languageIcon || languageSnippetCount === undefined) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await client.connect();
    const database = client.db('Snippets');

    // Check if the collection already exists
    const collections = await database.listCollections().toArray();
    if (collections.some(col => col.name.toLowerCase() === languageName.toLowerCase())) {
      return res.status(400).send('Collection already exists');
    }

    // Create a new collection for the language
    await database.createCollection(languageName);

    // Add the language metadata to the LanguagesData collection
    const newLanguage = new Language({
      languageID,
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

app.put('/api/snippets/update/:snippetID', async (req, res) => {
  const { snippetID } = req.params;
  const updatedSnippet = req.body;

  try {
      await client.connect();
      const database = client.db('Snippets');
      const collectionName = updatedSnippet.programmingLanguage;
      const result = await database.collection(collectionName).updateOne(
          { snippetID: parseInt(snippetID) },
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

// Endpoint to update a project with a new language
app.put('/api/projects/update/:projectID', async (req, res) => {
  const { projectID } = req.params;
  const updatedProject = req.body;

  try {
    const project = await Project.findOneAndUpdate({ projectID: parseInt(projectID) }, updatedProject, { new: true });

    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.status(200).send('Project updated successfully');
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Error updating project');
  }
});


// Endpoint to create a new snippet
app.post('/api/snippets/create', async (req, res) => {
  const {
    snippetID,
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

  if (!snippetID || !dateCreated || !lastDateModified || !programmingLanguage || !codeArray || !writeUp || !snippetDescription || !snippetSource || !snippetSourceLinks || !snippetName) {
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
      snippetID,
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
