'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.categories, { foreignKey: 'categoryId', as: 'categories'})
    }
  };
  categories.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};