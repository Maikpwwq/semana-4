'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categorias', [{
            nombre: 'Categoria_test',
            descripcion: 'lorem limsus test',
            createdAt: new Date(),
            updatedAt: new Date()

        }]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categorias', null, {});
    }
};