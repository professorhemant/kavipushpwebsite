const { Order, OrderItem, Product } = require('../models');

const genOrderNumber = () => 'KP' + Date.now().toString().slice(-8);

exports.create = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone,
            address_line1, address_line2, city, state, pincode,
            items, payment_method, notes } = req.body;

    let subtotal = 0;
    for (const item of items) {
      subtotal += parseFloat(item.price) * item.qty;
    }
    const shipping = subtotal >= 999 ? 0 : 99;
    const total = subtotal + shipping;

    const order = await Order.create({
      order_number: genOrderNumber(),
      customer_name, customer_email, customer_phone,
      address_line1, address_line2, city, state, pincode,
      subtotal, shipping, total,
      payment_method: payment_method || 'razorpay',
      notes
    });

    const orderItems = items.map(item => ({
      order_id:   order.id,
      product_id: item.product_id,
      name:       item.name,
      image:      item.image,
      price:      item.price,
      qty:        item.qty,
      size:       item.size,
      color:      item.color
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ order_id: order.id, order_number: order.order_number, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    await order.update({
      razorpay_order_id,
      razorpay_payment_id,
      payment_status: 'paid',
      status: 'confirmed'
    });
    res.json({ message: 'Payment confirmed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const where = status ? { status } : {};
    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });
    res.json({ total: count, orders: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: 'items', include: ['product'] }]
    });
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    await order.update({ status: req.body.status });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
