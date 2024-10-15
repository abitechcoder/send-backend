'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    donor: DataTypes.STRING,
    status: DataTypes.STRING,
    partner: DataTypes.STRING,
    location: DataTypes.STRING,
    duration: DataTypes.STRING,
    budget: DataTypes.STRING,
    program_area: DataTypes.STRING,
    report: DataTypes.STRING,
    problem_image: DataTypes.STRING,
    problem_desc: DataTypes.TEXT,
    solution_desc: DataTypes.TEXT,
    beneficiaries_desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};