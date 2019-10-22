module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'banners',
      [
        {
          name: '1.jpg',
          path: 'seeds/1.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '2.png',
          path: 'seeds/2.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '3.jpg',
          path: 'seeds/3.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '4.jpeg',
          path: 'seeds/4.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '5.jpeg',
          path: 'seeds/5.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '6.jpeg',
          path: 'seeds/6.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '7.jpeg',
          path: 'seeds/7.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '8.jpg',
          path: 'seeds/8.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '9.jpg',
          path: 'seeds/9.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '10.jpg',
          path: 'seeds/10.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '11.jpg',
          path: 'seeds/11.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '12.jpg',
          path: 'seeds/12.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'chaves.jpeg',
          path: 'seeds/chaves.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('banners', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
