//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Address = require("./models/Address");
const Product = require("./models/Product");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");

Address.belongsTo(User);
User.hasOne(Address);
Order.belongsTo(User);
User.hasMany(Order);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);

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
