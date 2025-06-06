// mongo-init/init-mongo.js
db.getSiblingDB('visi_db').createUser(
  {
    user: "u7826495",
    pwd: "p3496756", 
    roles: [
      { role: "readWrite", db: "visi_db" }
    ]
  }
);