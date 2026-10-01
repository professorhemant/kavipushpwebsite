const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

const SECRET = process.env.JWT_SECRET || 'kavipushp_secret_2025';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setup = async (req, res) => {
  try {
    const count = await Admin.count();
    if (count > 0) return res.status(403).json({ message: 'Admin already exists' });
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hash, name });
    res.json({ message: 'Admin created', id: admin.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
