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
   return queryInterface.bulkInsert('Spots', [
    {
      ownerId: 1,
      address: '123 Hilly Road',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Fresh House',
      description: 'This is a big house that smells very fresh',
      price: 750
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
  }
};
