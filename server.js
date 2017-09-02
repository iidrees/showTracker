// import dependencies and create the server
/* import express from 'express';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import { db } from './mongodb/mongo';
*/
const express = require('express');
const dotenv = require('dotenv').config();
const mdb = require('./mongodb/mongo.js');

// initialise Database connection and set up app
// get Mongodb url and create db variable
const url = process.env.MONGO_DB;
// let db;
// let coll;
mdb.connect((err) => {
  const test = require('./model/test');
  const app = express();

  // dotenv.config();
  const port = process.env.PORT || 3537;

  // set the view engine to ejs
  app.set('views', `${process.cwd()}/` + 'views');
  app.set('view engine', 'ejs');

  // import static files from the public folder
  app.use(express.static('public'));

  // routes to be taken out of here later.
  app.get('/home', (req, res) => {
    res.send('Hello world');
  });
  app.get('/test', (req, res) => {
    res.render('home');
  });
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(app.get('env'));
    // console.log(process.env.PORT);
    console.log(`Server running on port ${port}`);
  });
});
