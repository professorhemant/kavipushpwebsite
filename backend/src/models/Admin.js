const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email:    { type: DataTypes.STRING(100), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  name:     { type: DataTypes.STRING(100) }
}, { tableName: 'admins', timestamps: true });

module.exports = Admin;
