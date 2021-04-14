const express = require('express');
const path = require('path');
let cors = require('cors');
let app = express();
let fs = require('fs');
let expressip = require('express-ip');
let DAO = require('./dao').DAO;
const PORT = process.env.PORT || 5000;

let dao = new DAO();

app.use(expressip().getIpInfoMiddleware);
app.use(cors());

app.get("/", (req, res) => {
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

app.get('/nyhet', (req, res) => {
  dao.getNyheter()
    .then(nyheter => JSON.stringify(nyheter))
    .then(nyheter => res.send(nyheter));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));