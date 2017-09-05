const express = require('express');
const passport = require('passport');
const mondb = require('../mongodb/mongo');
const helperFunction = require('../model/function.js');
const auth = require('../model/auth.js');


const router = express.Router();


// routes to be taken out of here later.

router.get('/', (req, res) => {
  console.log(req.user, ' req.user from the routes');
  res.render('landing',
    { user: req.user,
      error: null,
      notice: null,
      success: null });
});
router.get('/home', (req, res) => {
  console.log(req.user, ' req.user from the routes');
  res.render('home', { user: req.user, error: null, notice: null, success: null });
});

/*router.post('/home', (req, res) => {
  // grab values from the req.body
  const email = req.body.username,
    password = req.body.password;
  console.log('Content parsed: ', email, password);
  res.render('home');
});*/

router.post('/home', passport.authenticate('local-signup', {
  successRedirect: '/app/home',
  failureRedirect: '/app/',
  })
);

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/app/home',
  failureRedirect: '/app/'
  })
);

// simple route middleware


console.log(mondb.getDb(), 'This is from my routes' )


module.exports = router;
