'use strict';
const {
  Model, DataTypes, 
} = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { 
        type: DataTypes.STRING,
        length: 50,
        allowNull: false,
      },
      otp: {
        type: DataTypes.NUMBER,
        allowNull: true,
        length: 4
      },
      otp_expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        length: 20,
      }
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Users',
  });
  return User;
};