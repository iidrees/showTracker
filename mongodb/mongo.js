// set up db

const MongoClient = require('mongodb').MongoClient;

let _db;

const url = process.env.MONGO_DB;
module.exports = {

  connect(callback) {
    MongoClient.connect(url, (err, db) => {
      _db = db;
      return callback(err);
    });
  },

  getDb() {
    console.log(`${_db} another object`);
    return _db;
  },
};

