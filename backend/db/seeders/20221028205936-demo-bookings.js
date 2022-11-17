'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Bookings', [
    {
      spotId:1,
      userId:2,
      startDate: '2023-01-04',
      endDate: '2023-01-07'
    },
    {
      spotId:2,
      userId:1,
      startDate: '2023-01-04',
      endDate: '2023-01-07'
    },
    {
      spotId:3,
      userId:4,
      startDate: '2023-01-04',
      endDate: '2023-01-07'
    },
    {
      spotId:4,
      userId:3,
      startDate: '2023-01-04',
      endDate: '2023-01-07'
    },
    {
      spotId:5,
      userId:1,
      startDate: '2023-01-09',
      endDate: '2023-01-11'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Bookings', null, {})
  }
};
