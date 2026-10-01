const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id:                  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_number:        { type: DataTypes.STRING(50), unique: true },
  customer_name:       { type: DataTypes.STRING(100), allowNull: false },
  customer_email:      { type: DataTypes.STRING(100) },
  customer_phone:      { type: DataTypes.STRING(20), allowNull: false },
  address_line1:       { type: DataTypes.STRING(255), allowNull: false },
  address_line2:       { type: DataTypes.STRING(255) },
  city:                { type: DataTypes.STRING(100), allowNull: false },
  state:               { type: DataTypes.STRING(100), allowNull: false },
  pincode:             { type: DataTypes.STRING(10), allowNull: false },
  subtotal:            { type: DataTypes.DECIMAL(10, 2) },
  shipping:            { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total:               { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status:              { type: DataTypes.ENUM('pending','confirmed','shipped','delivered','cancelled'), defaultValue: 'pending' },
  payment_method:      { type: DataTypes.ENUM('razorpay','whatsapp','cod'), defaultValue: 'razorpay' },
  payment_status:      { type: DataTypes.ENUM('pending','paid','failed','refunded'), defaultValue: 'pending' },
  razorpay_order_id:   { type: DataTypes.STRING(100) },
  razorpay_payment_id: { type: DataTypes.STRING(100) },
  notes:               { type: DataTypes.TEXT }
}, { tableName: 'orders', timestamps: true });

module.exports = Order;
