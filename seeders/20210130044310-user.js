'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('users',[{
     name: 'Cristiam',
     email: 'Cris@gmail.com',
     password: '$2y$10$Qk1HKnE/sO.LBVu5e1sLluiSxEjlhYv3Nm7cZsDaBGXkmmTYzulxm ',
     rol:  'Administrador',
     createdAt: new Date(),
     updatedAt: new Date()
   }])
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Users', null, {});
  }
};
