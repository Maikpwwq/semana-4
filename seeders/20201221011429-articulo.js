'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articulos', [{
      codigo: 'Art',
      nombre: 'Article_test',
      descripcion: 'lorem limsus test',      
      estado: 1,
      categoriaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articulos', null, {});
  }
};
