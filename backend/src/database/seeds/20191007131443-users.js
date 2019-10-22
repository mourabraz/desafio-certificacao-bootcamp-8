const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    const hashed = await bcrypt.hash('123456', 8);

    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'johndoe@test.com',
          password_hash: hashed,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'John Bar',
          email: 'johnbar@test.com',
          password_hash: hashed,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bar Foo',
          email: 'barfoo@test.com',
          password_hash: hashed,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Clark Kent',
          email: 'superman@test.com',
          password_hash: hashed,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bruce Wayne',
          email: 'batman@test.com',
          password_hash: hashed,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
