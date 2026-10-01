const sequelize = require('../config/database');
const Admin     = require('./Admin');
const Category  = require('./Category');
const Product   = require('./Product');
const Order     = require('./Order');
const OrderItem = require('./OrderItem');

// Associations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = { sequelize, Admin, Category, Product, Order, OrderItem };
