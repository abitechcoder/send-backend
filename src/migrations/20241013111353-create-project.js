'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      donor: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      partner: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.STRING
      },
      program_area: {
        type: Sequelize.STRING
      },
      report: {
        type: Sequelize.STRING
      },
      problem_image: {
        type: Sequelize.STRING
      },
      problem_desc: {
        type: Sequelize.TEXT
      },
      solution_desc: {
        type: Sequelize.TEXT
      },
      beneficiaries_desc: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};