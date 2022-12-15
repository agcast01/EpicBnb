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
     options.tableName = 'Spots';
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://foodmeanderings.com/wp-content/uploads/2017/11/Gingerbread-house-condo.jpg'
    },
    {
      ownerId: 6,
      address: '124 Hilly Ct',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Modern House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 900,
      previewImage: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 7,
      address: '123 Hilly Ln',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Angular House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 500,
      previewImage: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 8,
      address: '123 Hilly St',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Lake House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 350,
      previewImage: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 9,
      address: '1238 Hilly Ct',
      city: 'Las Vegas',
      state: 'Nevada',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Desert House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 600,
      previewImage: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 10,
      address: '129 Hilly Ct',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Nice Brown House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 300,
      previewImage: 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 11,
      address: '1500 Sunny Way',
      city: 'Chicago',
      state: 'Illinois',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'House of Many Columns',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 12,
      address: '4305 St Regis',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'House with a Pool',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 500,
      previewImage: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 13,
      address: '123 Hills Ln',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'House with lots of Shingles',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 14,
      address: '1218 Pizza Pl',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Rocky House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://images.pexels.com/photos/463996/pexels-photo-463996.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 15,
      address: 'Sandy Beach',
      city: 'Pensacola',
      state: 'Florida',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Beach House',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 200,
      previewImage: 'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 16,
      address: '123 River Way',
      city: 'Gatlinburg',
      state: 'Tennessee',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Forest Getaway',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 17,
      address: '1800 S 32nd St',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'City Experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 100,
      previewImage: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 18,
      address: '123 Monkey Spot',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Available Lot',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 300,
      previewImage: 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 19,
      address: '123 Unknown Ln',
      city: 'Louisville',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Private Spot',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://images.pexels.com/photos/2371975/pexels-photo-2371975.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
    {
      ownerId: 20,
      address: '123 Farmers Market',
      city: 'Bowling Green',
      state: 'Kentucky',
      country: 'United States',
      lat: 38.2527,
      lng: 85.7585,
      name: 'Barn',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 400,
      previewImage: 'https://images.pexels.com/photos/2893177/pexels-photo-2893177.jpeg?auto=compress&cs=tinysrgb&w=1600'
    },
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
