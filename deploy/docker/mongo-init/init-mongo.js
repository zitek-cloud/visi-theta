const collection = 'users';

const database_dev = 'visi_db_dev';
use(database_dev);
db.getSiblingDB(database_dev).createUser(
  {
    user: "u7869687",
    pwd: "p3965483",
    roles: [
      { role: "readWrite", db: database_dev }
    ]
  }
);
db.createCollection(collection);

const database_test = 'visi_db_test';
use(database_test);
db.getSiblingDB(database_test).createUser(
  {
    user: "u7826495",
    pwd: "p3496756", 
    roles: [
      { role: "readWrite", db: database_test }
    ]
  }
);
db.createCollection(collection);

const database_stag = 'visi_db_stag';
use(database_stag);
db.getSiblingDB(database_stag).createUser(
  {
    user: "u7898925",
    pwd: "p3643254",
    roles: [
      { role: "readWrite", db: database_stag }
    ]
  }
);
db.createCollection(collection);

const database_prod = 'visi_db_prod';
use(database_prod);
db.getSiblingDB(database_prod).createUser(
  {
    user: "u7925415",
    pwd: "p3434874",
    roles: [
      { role: "readWrite", db: database_prod }
    ]
  }
);
db.createCollection(collection);