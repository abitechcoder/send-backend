'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Identities", 'value', {
      type: Sequelize.TEXT,
      allowNull: true
    })

    await queryInterface.addColumn("Identities", 'principle', {
      type: Sequelize.TEXT,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Identities", "value");
    await queryInterface.removeColumn("Identities", "principle");
  }
};
