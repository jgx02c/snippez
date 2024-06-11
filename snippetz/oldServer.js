const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Load models
require('./backend/models/Project');
require('./backend/models/Language');
require('./backend/models/Recent');
require('./backend/models/Snippet');

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


// Define MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Language Endpoints
 */

// Endpoint to get all languages
app.get('/api/languages', async (req, res) => {
  try {
    const languagesData = await Language.find();
    res.json(languagesData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get a language by ID
app.get('/api/languages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const language = await Language.findOne({ _id: id });
    if (!language) {
      return res.status(404).send('Language not found');
    }
    res.json(language);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to create a new language
app.post('/api/languages/create', async (req, res) => {
  const { languageName, languageIcon, languageSnippetCount } = req.body;

  if (!languageName || !languageIcon || languageSnippetCount === undefined) {
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

/**
 * Project Endpoints
 */

// Endpoint to get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get a project by name
app.get('/api/projects/:projectName', async (req, res) => {
  const { projectName } = req.params;
  try {
    const project = await Project.findOne({ projectName });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    await client.connect();
    const database = client.db('Snippets');

    // Fetch snippets and language details for each language in the project
    const projectSnippets = await Promise.all(
      project.projectSnippets.map(async ({ language, snippets }) => {
        const languageDetails = await Language.findOne({ languageName: language.languageName });
        const snippetsDetails = await Promise.all(
          snippets.map(async snippetName => {
            const snippet = await database.collection(language.languageName).findOne({ snippetName });
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

// Endpoint to create a new project
app.post('/api/projects/create', async (req, res) => {
  const { dateCreated, lastDateModified, projectName, projectSnippets } = req.body;

  if (!dateCreated || !lastDateModified || !projectName || !projectSnippets) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const newProject = new Project({
      dateCreated,
      lastDateModified,
      projectName,
      projectSnippets
    });

    await newProject.save();

    res.status(201).send('Project created successfully');
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).send('Error creating project');
  }
});

// Endpoint to add a language to a project
app.post('/api/projects/:projectName/add-language', async (req, res) => {
  const { projectName } = req.params;
  const { language } = req.body;

  try {
    const project = await Project.findOne({ projectName });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    project.projectSnippets.push({
      language: {
        languageName: language.languageName,
        languageIcon: language.languageIcon,
        languageSnippetCount: language.languageSnippetCount
      },
      snippets: []
    });

    await project.save();

    res.status(200).send('Language added to project successfully');
  } catch (err) {
    console.error('Error adding language to project:', err);
    res.status(500).send('Error adding language to project');
  }
});

// Endpoint to get all snippets in a project
app.get('/api/projects/:projectName/snippets', async (req, res) => {
  const { projectName } = req.params;
  try {
    const project = await Project.findOne({ projectName });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    const snippets = [];
    await client.connect();
    const database = client.db('Snippets');

    for (const { language, snippets: snippetNames } of project.projectSnippets) {
      const snippetCollection = await database.collection(language.languageName).find().toArray();
      snippets.push(...snippetCollection.filter(snippet => snippetNames.includes(snippet.snippetName)));
    }

    res.json(snippets);
  } catch (err) {
    console.error('Error retrieving project snippets:', err);
    res.status(500).send('Error retrieving project snippets');
  } finally {
    await client.close();
  }
});

// Endpoint to update a project with a new language
app.put('/api/projects/update/:projectName', async (req, res) => {
  const { projectName } = req.params;
  const updatedProject = req.body;

  try {
    const project = await Project.findOneAndUpdate({ projectName }, updatedProject, { new: true });

    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.status(200).send('Project updated successfully');
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Error updating project');
  }
});

/**
 * Snippet Endpoints
 */

// Endpoint to get all snippets
app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get a snippet by language
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

// Endpoint to get a snippet by name across all collections
app.get('/api/snippet/:snippetName', async (req, res) => {
  const { snippetName } = req.params;
  try {
    await client.connect();
    const database = client.db('Snippets');
    const collections = await database.listCollections().toArray();

    let snippet = null;

    for (const collection of collections) {
      snippet = await database.collection(collection.name).findOne({ snippetName });
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

// Endpoint to create a new snippet
app.post('/api/snippets/create', async (req, res) => {
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

// Endpoint to update a snippet
app.put('/api/snippets/update/:snippetName', async (req, res) => {
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

// Endpoint to delete a snippet
app.delete('/api/snippets/:snippetName', async (req, res) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});