const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

const Items = sequelize.define("Items", {
  name: { type: Sequelize.STRING, unique: true },
  price: { type: Sequelize.DOUBLE },
  image: { type: Sequelize.STRING },

  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
    // sqlite3에서 직접 입력할시 항상 같은 날짜 시간이 세팅된다. 아마도 DB 만들어졌을 때 시간
  },
});

module.exports = { Items, Sequelize, sequelize };
