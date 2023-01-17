//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Address = require("./models/Address");
const Product = require("./models/Product");
const Order = require("./models/Order");
const LineItem = require("./models/LineItem");
const LikedItem = require("./models/LikedItem")


Product.hasOne(LineItem, { foreignKey: "productId" });
LineItem.belongsTo(Product);

Address.belongsTo(User);
User.hasOne(Address);

//liked items should have foreign key of user
LikedItem.belongsTo(User) 
User.hasMany(LikedItem)


module.exports = {
  db,
  models: {
    User,
    Address,
    Product,
    Order,
    LineItem,
    LikedItem
  },
};
