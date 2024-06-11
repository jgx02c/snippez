const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Language = require('../models/Language');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Endpoint to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to get a project by name
router.get('/:projectName', async (req, res) => {
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
router.post('/api/projects/create', async (req, res) => {
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
router.post('/languages/:projectName', async (req, res) => {
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
router.get('/snippets/:projectName', async (req, res) => {
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
router.put('/update/:projectName', async (req, res) => {
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

module.exports = router;
