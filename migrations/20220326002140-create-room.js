"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      room_name: {
        type: Sequelize.STRING,
      },
      playerOne: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
            schema: "public",
          },
          key: "id",
        },
      },
      playerTwo: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
            schema: "public",
          },
          key: "id",
        },
      },
      choiceOne: {
        type: Sequelize.ARRAY(Sequelize.ENUM("Rock", "Paper", "Scissor")),
      },
      choiceTwo: {
        type: Sequelize.ARRAY(Sequelize.ENUM("Rock", "Paper", "Scissor")),
      },
      draw: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rooms");
  },
};
