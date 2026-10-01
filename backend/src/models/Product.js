const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING(200), allowNull: false },
  slug:        { type: DataTypes.STRING(200), unique: true, allowNull: false },
  description: { type: DataTypes.TEXT },
  price:       { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  mrp:         { type: DataTypes.DECIMAL(10, 2) },
  images:      { type: DataTypes.JSON, defaultValue: [] },
  sizes:       { type: DataTypes.JSON, defaultValue: [] },
  colors:      { type: DataTypes.JSON, defaultValue: [] },
  stock:       { type: DataTypes.INTEGER, defaultValue: 0 },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active:   { type: DataTypes.BOOLEAN, defaultValue: true },
  material:    { type: DataTypes.STRING(100) },
  occasion:    { type: DataTypes.STRING(100) },
  weight:      { type: DataTypes.STRING(50) },
  tags:        { type: DataTypes.JSON, defaultValue: [] }
}, { tableName: 'products', timestamps: true });

module.exports = Product;
