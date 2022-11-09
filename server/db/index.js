//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Address = require("./models/Address");
const Product = require("./models/Product");

Address.belongsTo(User);
User.hasOne(Address);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Address,
    Product,
  },
};
