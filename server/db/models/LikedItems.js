const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const LikedItems = db.define("likeditem", {
  productId: DataTypes.INTEGER,
  name: DataTypes.STRING, 
  price: DataTypes.DECIMAL, 
  description: DataTypes.TEXT, 
  imageUrl: DataTypes.STRING, 
})

module.exports = LikedItems