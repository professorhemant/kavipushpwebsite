const router = require('express').Router();
const auth   = require('../middleware/auth');
const { Order, Product, Category } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

router.get('/stats', auth, async (req, res) => {
  try {
    const [totalOrders, totalRevenue, totalProducts, pendingOrders] = await Promise.all([
      Order.count(),
      Order.sum('total', { where: { payment_status: 'paid' } }),
      Product.count({ where: { is_active: true } }),
      Order.count({ where: { status: 'pending' } })
    ]);
    res.json({ totalOrders, totalRevenue: totalRevenue || 0, totalProducts, pendingOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
