const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

module.exports = db.define("product", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
