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
