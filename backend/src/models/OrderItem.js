const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id:   { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  name:       { type: DataTypes.STRING(200) },
  image:      { type: DataTypes.STRING(500) },
  price:      { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  qty:        { type: DataTypes.INTEGER, allowNull: false },
  size:       { type: DataTypes.STRING(50) },
  color:      { type: DataTypes.STRING(50) }
}, { tableName: 'order_items', timestamps: false });

module.exports = OrderItem;
