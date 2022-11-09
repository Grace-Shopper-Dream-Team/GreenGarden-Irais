//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Address = require("./models/Address");
const Product = require("./models/Product");

Address.belongsTo(User);
User.hasOne(Address);

const Order = require("./models/Order");
const LineItem = require("./models/LineItem");


// TODO: Keep these commented out for now until we've built the shopping cart page with dummy data and tested it.
// Order.belongsTo(User);
// User.hasMany(Order);
// LineItem.belongsTo(Order);
// Order.hasMany(LineItem);


//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Address,
    Product,
    Order,
    LineItem,
  },
};
