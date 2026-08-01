const express = require('express');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
var cors = require('cors')
require('dotenv').config();

const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const app = express();
const port = 4000;
app.use(bodyparser.json())
app.use(cors())

async function start() {
  await client.connect();
  const db = client.db(dbName);

  // Get all the passwords
  app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult});
  });

  // Delete a password
  app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult});
  });

  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Startup error:', err);
});