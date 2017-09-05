//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const Q = require('q');
const bcrypt = require('bcryptjs');
const mongodb = require('../mongodb/mongo');

const db = mongodb.getDb();
//console.log(db, 'Is function');
// used in local signup
module.exports.localReg = (username, password) => {
  let deferred = Q.defer();

  let collection = db.collection('localUsers');
  console.log(collection, 'Is function');
  collection.findOne({ 'username': username })
    .then((result) => {
      if (null != result) {
        console.log('USERNAME ALREADY EXISTS:', result.username );
        deferred.resolve(false);
      }
      else {
        let hash = bcrypt.hashSync(password, 8);
        let user = {
          'username': username,
          'password': hash,
        }

        console.log('CREATING USER:', username);

        collection.insert(user)
          .then(() => {
            db.close();
            deferred.resolve(user);
          });
      }
    });
  return deferred.promise;
};


// If user already exists use this sign in method.
/*
  Check if User exists,
  if user exists check if passwords match ( use bcrypt.compareSync(password, hash); 
  // it should return true where 'hash' is password in db)
  if password matches take into website 
  if user doesn't exist or password does not match tell them it failed 
*/

module.exports.localAuth = (username, password) => {
  let deferred = Q.defer();

  let collection = db.collection('localUsers');
  collection.findOne({ 'username': username})
    .then((result) => {
      if (null === result) {
        console.log('USERNAME NOT FOUND', username);
        deferred.resolve(false);
      } else {
        let hash = result.password;
        console.log("FOUND USER: ", result.username);
        
        if (bcrypt.compareSync(password, hash)) {
          deferred.resolve(result);
        } else {
          console.log("AUTHENTICATION FAILED");
          deferred.resolve(false);
        }
      }
      db.close();
    });
  return deferred.promise;
};
