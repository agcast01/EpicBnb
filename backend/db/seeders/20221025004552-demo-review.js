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
     options.tableName = 'Reviews';
    return queryInterface.bulkInsert( options,
      [
        {
          userId: 1,
          spotId: 2,
          review: 'True to their word, this house really did smell',
          stars: 2
        },
        {
          userId: 2,
          spotId: 1,
          review: 'Wow my house never smells this fresh',
          stars: 3
        },
        {
          userId: 3,
          spotId: 5,
          review: 'Really made me feel at home but smelled funny',
          stars: 3
        },
        {
          userId: 4,
          spotId: 5,
          review: 'I accidentally ate part of the wall and got charged for it.',
          stars: 1
        },
        {
          userId: 5,
          spotId: 3,
          review: 'Hosted many friends here. Great venue!',
          stars: 5
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName= 'Reviews'
    return queryInterface.bulkDelete(options, null, {});
  }
};
