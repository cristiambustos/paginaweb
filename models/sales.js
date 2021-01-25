'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sales, { foreignKey: 'saleId', as: 'sales'});
    }
  };
  sales.init({
    userId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    num_bill: DataTypes.STRING,
    tax: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sales',
  });
  return sales;
};