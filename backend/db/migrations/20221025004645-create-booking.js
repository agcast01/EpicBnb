'use strict';

const { all } = require('../../app');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });

    await queryInterface.addIndex('Bookings', ['spotId', 'startDate', 'endDate'], {
      unique: true
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
    await queryInterface.removeIndex('Bookings', ['spotId', 'startDate', 'endDate'])
  }
};
