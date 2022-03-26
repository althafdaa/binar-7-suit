"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {}
  }
  room.init(
    {
      room_name: DataTypes.STRING,
      playerOne: DataTypes.INTEGER,
      playerTwo: DataTypes.INTEGER,
      choiceOne: DataTypes.ARRAY(DataTypes.ENUM("Rock", "Paper", "Scissor")),
      choiceTwo: DataTypes.ARRAY(DataTypes.ENUM("Rock", "Paper", "Scissor")),
      win_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lose_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      draw: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "room",
      tableName: "rooms",
    }
  );
  return room;
};
