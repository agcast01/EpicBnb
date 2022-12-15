'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'John',
        lastName: 'Smith'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Joe',
        lastName: 'Schmoe'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Jane',
        lastName: 'Doe'
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Peter',
        lastName: 'Cottontail'
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Ricardo',
        lastName: 'Lopez'
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Adam',
        lastName: 'Meadows'
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Evan',
        lastName: 'Ross'
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Allen',
        lastName: 'Avila'
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Alyssa',
        lastName: 'Jackson'
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Heather',
        lastName: 'Griffith'
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Tony',
        lastName: 'Scott'
      },
      {
        email: 'user11@user.io',
        username: 'FakeUser11',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Nancy',
        lastName: 'Schaefer'
      },
      {
        email: 'user12@user.io',
        username: 'FakeUser12',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'William',
        lastName: 'Hunt'
      },
      {
        email: 'user13@user.io',
        username: 'FakeUser13',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Paul',
        lastName: 'Garza'
      },
      {
        email: 'user14@user.io',
        username: 'FakeUser14',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Alejandro',
        lastName: 'Kirby'
      },
      {
        email: 'user15@user.io',
        username: 'FakeUser15',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Danielle',
        lastName: 'Hill'
      },
      {
        email: 'user16@user.io',
        username: 'FakeUser16',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'John',
        lastName: 'Aguilar'
      },
      {
        email: 'user17@user.io',
        username: 'FakeUser17',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'Stacey',
        lastName: 'Duran'
      },
      {
        email: 'user18@user.io',
        username: 'FakeUser18',
        hashedPassword: (bcrypt.hashSync('password5')),
        firstName: 'James',
        lastName: 'Rodriguez'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4'] }
    }, {});
  }
};
