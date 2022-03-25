"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }
  user.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      hooks: {
        beforeCreate: (instance) => {
          const salt = bcrypt.genSaltSync(10);
          instance.password = bcrypt.hashSync(instance.password, salt);
        },
      },
    }
  );
  user.authenticate = async function ({ username, password }) {
    try {
      let instance = await this.findOne({
        where: {
          username: username,
        },
      });
      if (!instance)
        return Promise.reject(new Error("Username doesn't exists"));

      let isValidPassword = instance.checkCredential(password);
      if (!isValidPassword) return Promise.reject(new Error("Wrong password!"));

      return Promise.resolve(instance);
    } catch (error) {
      return Promise.reject(err);
    }
  };

  user.prototype.checkCredential = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  return user;
};
