const express = require('express');
const path = require('path');
let cors = require('cors');
let app = express();
let fs = require('fs');
let fsPromises = fs.promises;
let expressip = require('express-ip');
let DAO = require('./dao').DAO;
let { readObjectsFromFile } = require('./utils');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

let dao = new DAO();

const baseDataFolder = './data/';

app.use(expressip().getIpInfoMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  res.locals.keys = Object.keys(req.query);
  res.locals.query = req.query;
  next();
});

app.get('/medlemmer', (req, res) => {
  return readObjectsFromFile(`${baseDataFolder}medlemmer.json`, res.locals.query)
    .then(medlemmer => res.send(medlemmer));
});

app.get('/innlegg', (req, res) => {
  return readObjectsFromFile(`${baseDataFolder}innlegg.json`, res.locals.query)
    .then(innlegg => res.send(innlegg));
});

app.get('/laater', (req, res) => {
  return readObjectsFromFile(`${baseDataFolder}laater.json`, res.locals.query)
    .then(laater => res.send(laater));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));
