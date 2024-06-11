require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const projectRoutes = require('./routes/projectRoutes');
const languageRoutes = require('./routes/languageRoutes');
const snippetRoutes = require('./routes/snippetRoutes');

const app = express();
const port = 4000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection URI
const uri = process.env.MONGO_URI;

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

// Load models
require('./models/Project');
require('./models/Language');
require('./models/Snippet');
require('./models/Recent');

// Use routes
app.use('/api/projects', projectRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/snippets', snippetRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
