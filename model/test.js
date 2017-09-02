// db testing  module
const mondb = require('../mongodb/mongo');
// mondb.db()
// console.log(mondb.getDb());
// console.log(mondb.getDb().collection('names').find());
const db = mondb.getDb().collection('test');
db.insertOne({
  item: 'item',
  kt: 'kt',
  now: 'now',
})
  .then((result) => {
    console.log('inserted');
    // console.log(result);
  });
const db1 = mondb.getDb().collection('names');
db.insertOne({
  item: 'item',
  kt: 'kt',
  now: 'now',
})
  .then((result) => {
    console.log('inserted');
    //console.log(result);
  });
