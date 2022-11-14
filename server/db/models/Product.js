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
    defaultValue:
      "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_500,h_500/at%2Fart%2Fdesign%2F2020-05%2Fencyclopedia-of-houseplants%2Fthumbnail%20images%2Fyucca-6dc9eefbca37c3fcf5b69c68015e862819b3811d_1",
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "no desc now",
  },
});
