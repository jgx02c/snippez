const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const appName = "backend";
const domain = "localhost";
const port = 4000;
const scheme = "http";

// Define your CORS whitelist
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3560',
  'http://localhost:5173'
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,PUT,POST,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
};

// We use the JSON parser in Express and CORS for all routes.
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Databases', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'snippet_board';


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

process.on('SIGINT', () => {
  console.log('SIGINT!');
  server.close(() => {
    console.log(`The ${appName} server will stop.`);
  });
  process.exitCode = 0;
});

app.get('/api', (req, res) => {
  const { usermode, id } = req.user;
  res.json({ usermode, id, data: 'Some protected data' });
});

app.delete('/api', (req, res) => {
  res.send('DELETE request to homepage');
});

app.get('/', (req, res) => {
  res.json({ message: "ok" });
});

app.post('/', (req, res) => {
  res.send('POST request to homepage');
});

// Route to create a new collection with metadata
app.post('/create-collection', (req, res) => {
  const { collectionName, logoUrl } = req.body;

  db.createCollection(collectionName)
    .then(() => {
      return db.collection('collection_metadata').insertOne({
        collectionName,
        logoUrl
      });
    })
    .then(() => res.status(200).send(`Collection ${collectionName} created successfully with metadata`))
    .catch(error => res.status(500).send(`Error creating collection: ${error.message}`));
});

// Route to get metadata for a collection
app.get('/collection-metadata/:collectionName', (req, res) => {
  const { collectionName } = req.params;

  db.collection('collection_metadata').findOne({ collectionName })
    .then(metadata => {
      if (metadata) {
        res.status(200).json(metadata);
      } else {
        res.status(404).send('Metadata not found');
      }
    })
    .catch(error => res.status(500).send(`Error fetching metadata: ${error.message}`));
});









var server = app.listen(port, () => {
  console.log(`The ${appName} server is now running on port ${port}.`);
  if (port === 80) {
    console.log(`Please open ${scheme}://${domain} in a browser.`);
  } else {
    console.log(`Please open ${scheme}://${domain}:${port} in a browser.`);
  }
});
