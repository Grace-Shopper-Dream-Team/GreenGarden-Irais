const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const LikedItems = db.define("likeditem", {
  productId: DataTypes.INTEGER,
  name: DataTypes.STRING, 
  price: DataTypes.INTEGER, 
  description: DataTypes.STRING, 
  imageUrl: DataTypes.STRING, 
})

module.exports = LikedItems