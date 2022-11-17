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
    },
    {
      ownerId: 2,
      address: '125 Hilly Road',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Stinky House',
      description: 'This is a big house that smells very stinky',
      price: 150
    },
    {
      ownerId: 3,
      address: '127 Hilly Road',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Party Place',
      description: 'Great place to throw a rager',
      price: 280
    },
    {
      ownerId: 4,
      address: '129 Hilly Road',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Farm House',
      description: 'Smells like a pig sty but is very cozy',
      price: 300
    },
    {
      ownerId: 5,
      address: '123 Hilly Ct',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Gingerbread',
      description: 'This is actually made out of gingerbread',
      price: 400
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
    return queryInterface.bulkDelete('Spots', null, {})
  }
};
