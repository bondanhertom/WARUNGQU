'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataUsers = require("../data-seed.json").Histories

    dataUsers.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Histories', dataUsers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Histories', null, {});
  }
};
