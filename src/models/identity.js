'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Identity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Identity.init({
    text: DataTypes.STRING,
    mission: DataTypes.STRING,
    vision: DataTypes.STRING,
    value: DataTypes.STRING,
    principle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Identity',
  });
  return Identity;
};