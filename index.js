const express = require('express');
const path = require('path');
let cors = require('cors');
let app = express();
let fs = require('fs');
let fsPromises = fs.promises;
let expressip = require('express-ip');
const showdown = require('showdown');
let DAO = require('./dao').DAO;
let { readObjectsFromFileAndParseQuery } = require('./utils');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

let dao = new DAO();
const converter = new showdown.Converter();

const baseDataFolder = './data/';

app.use(expressip().getIpInfoMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  if (req.query.antall) {
    req.query.antall = parseInt(req.query.antall);
      if (isNaN(req.query.antall)) {
	  res.status(400);
	  res.send('Antall må være et heltall');
      return;
    }
  }
  res.locals.keys = Object.keys(req.query);
  res.locals.query = req.query;
  next();
});

app.get('/medlemmer', (req, res) => {
  return readObjectsFromFileAndParseQuery(`${baseDataFolder}medlemmer.json`, res.locals.query)
    .then(medlemmer => res.send(medlemmer));
});

app.get('/innlegg', (req, res) => {
  return readObjectsFromFileAndParseQuery(`${baseDataFolder}innlegg.json`, res.locals.query)
    .then(innlegg => res.send(innlegg));
});

app.get('/laater', (req, res) => {
  return readObjectsFromFileAndParseQuery(`${baseDataFolder}laater.json`, res.locals.query)
    .then(laater => res.send(laater));
});

app.get('/info', (req, res) => {
  return fsPromises.open('./README.md', 'r')
    .then(file => file.readFile('utf-8'))
    .then(str => str.split('<!--info-->'))
    .then(info => converter.makeHtml(info[1]))
    .then(info => res.send(info));
})

app.listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));
