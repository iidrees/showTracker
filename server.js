// import dependencies and create the server
/* import express from 'express';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import { db } from './mongodb/mongo';
*/
const express = require('express');
const dotenv = require('dotenv').config();
const mdb = require('./mongodb/mongo.js');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;





// initialise express
const app = express();


// dotenv.config();
const port = process.env.PORT || 3537;

// set the view engine to ejs
app.set('views', `${process.cwd()}/` + 'views');
app.set('view engine', 'ejs');

// Configure Express
app.use(express.static('public'));
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'idrees', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());


// Session-persisted message middleware
app.use((req, res, next) => {
  let err = req.session.error,
    msg = req.session.notice,
    success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});
// initialise Database connection and set up app
// get Mongodb url and create db variable
const url = process.env.MONGO_DB;

//mdb.getDb();

mdb.connect((err) => {
  const routes = require('./routes/routes');
  const test = require('./model/test');
  const helperFunction = require('./model/function.js');
  const passportAuth = require('./model/auth.js');
  helperFunction.localReg();
  app.use('/app', routes);
  console.log(mdb.getDb(), 'this is the server');
})
  // server 
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(app.get('env'));
    // console.log(process.env.PORT);
    console.log(`Server running on port ${port}`);
  });
