const funct = require('../model/function');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('../mongodb/mongo');

// console.log(mongodb.getDb(), 'this is the auth part');

passport.serializeUser((user, done) => {
  console.log('serializing ',  user.username);
  done(null, user);
});

passport.deserializeUser(( obj, done) => {
  console.log('deserializing ',  obj);
  done(null, obj);
});

// user the LocalStrategy within Passport to Login/"signin" users

passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true},
  (req, username, password, done) => {
    funct.localAuth(username, password)
      .then((user) => {
        if (user) {
          console.log("LOGGED IN AS: ", user.username);
          req.session.success = `You are successfully logged in ${user.username} !`;
          done(null, user);
        }
        if (!user) {
          console.log("COULD NOT LOG IN ");
          req.session.error = 'Could not log in user. Please try again.';
          done(null, user);
        }
      })
      .fail((err) => {
        console.log(err.body);
      });
  }
));





// Use the LocalStrategy within Passport to sign-up users
passport.use('local-signup', new LocalStrategy( 
  { passReqToCallback: true },
  (req, username, password, done) => {
    funct.localReg(username, password)
      .then((user) => {
        if (user) {
          console.log(`REGISTERED: ${user.username}`);
          req.session.success = 'You are Successfully registered and logged in ' + user.username + '!';
          done(null, user);
        }
        if ( !user ) {
          console.log('COULD NOT REGISTER');
          req.session.error = 'That username is already in use, please try a different one.';
          done(null, user);
        }
      })
      .fail((err) => {
        console.log(err.body);
      });
  }
));




// simple route middleware
let ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in';
  res.redirect('/landing');

}

