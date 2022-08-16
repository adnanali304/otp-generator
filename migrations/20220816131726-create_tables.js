'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
        type: DataTypes.INTEGER,
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
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
