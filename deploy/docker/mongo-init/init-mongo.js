const database = 'visi_db';
const collection = 'users';

// Create a new database.
use(database);

db.getSiblingDB(database).createUser(
  {
    user: "u7826495",
    pwd: "p3496756", 
    roles: [
      { role: "readWrite", db: database }
    ]
  }
);

// Create a new collection.
db.createCollection(collection);