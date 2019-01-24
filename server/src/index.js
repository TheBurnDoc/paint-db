#!/usr/bin/env node
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

// Welcome message and version
var meta = require('../package.json');
var metaStr = `${meta.description} ${meta.version}`;
console.log(`Starting ${metaStr}...`);

// Database connection
console.log(`Connecting to database URI \"${config.mongoUri}\"`);
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useMongoClient: true }, err => {
  if (err) throw new Error(err.message); // Halt execution
});

// Express app object
var app = express();

// Server logging middleware
app.use(require('morgan')((config.devServer) ? 'dev' : 'common'));

// Client-side config cookie middleware
app.use(function(req, res, next) {
  res.cookie('config', JSON.stringify({
    basename: config.clientRoot,
    backendUri: `http://${config.hostname}:${config.port}${config.graphQLRoot}`,
  }));
  next();
});

// GraphQL endpoint (default: /graphql)
var schema = require('./schema');
require('./routes/graphql')(app, schema);

// Start server
app.listen(config.port);
