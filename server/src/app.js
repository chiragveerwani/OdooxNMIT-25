// Express server entry point
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to OdooxNMIT-25 Server');
});

module.exports = app;