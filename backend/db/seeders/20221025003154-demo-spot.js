'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   return queryInterface.bulkInsert(options, [
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
      price: 750,
      previewImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
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
      price: 150,
      previewImage: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
      price: 280,
      previewImage: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
      price: 300,
      previewImage: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg'
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
      price: 400,
      previewImage: 'https://foodmeanderings.com/wp-content/uploads/2017/11/Gingerbread-house-condo.jpg'
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
    options.tableName = 'Spots'
    return queryInterface.bulkDelete(options, null, {})
  }
};
