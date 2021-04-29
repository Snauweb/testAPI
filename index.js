const express = require('express');
const path = require('path');
let cors = require('cors');
let app = express();
let fs = require('fs');
let fsPromises = fs.promises;
let expressip = require('express-ip');
let DAO = require('./dao').DAO;
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

app.get("/ip", (req, res) => {
  fs.readFile('index.html', 'utf-8', (err, data) => {
    if (err) throw err;
    data = data.replace('ipnr', req.headers['x-forwarded-for'] || req.ipInfo.ip).replace('portnr', req.socket.remotePort);
    res.send(data);
  })
});

app.get("/add", (req, res) => {
  let a = Number(req.query.a), b = Number(req.query.b);
  res.send("" + (a + b));
});

app.get('/nyheter', (req, res) => {
  dao.getNyheter()
    .then(nyheter => JSON.stringify(nyheter))
    .then(nyheter => res.send(nyheter));
});

app.get('/nyheter/:id', (req, res) => {
  dao.getNyhet(req.params.id)
    .then(nyhet => JSON.stringify(nyhet))
    .then(nyhet => res.send(nyhet));
});

app.post('/nyheter', (req, res) => {
  params = req.body ? [req.body.overskrift, req.body.tekst, req.body.forfatter] : [req.params.overskrift, req.params.tekst, req.params.forfatter]
  dao.addNyhet(...params)
    .then(status => res.send(201))
    .catch(err => res.sendStatus(400));
});

app.get('/medlemmer', (req, res) => {
  return fsPromises.open(`${baseDataFolder}medlemmer.json`, 'r')
    .then(file => file.readFile('utf-8'))
    .then(str => JSON.parse(str))
    .then(medlemmer => res.send(medlemmer));
});

app.get('/innlegg', (req, res) => {
  return fsPromises.open(`${baseDataFolder}innlegg.json`, 'r')
    .then(file => file.readFile('utf-8'))
    .then(str => JSON.parse(str))
    .then(innlegg => res.send(innlegg));
});

app.get('/laater', (req, res) => {
  return fsPromises.open(`${baseDataFolder}laater.json`, 'r')
    .then(file => file.readFile('utf-8'))
    .then(str => JSON.parse(str))
    .then(laater => res.send(laater));
})


app.listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));
