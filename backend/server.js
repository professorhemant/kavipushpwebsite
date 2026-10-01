require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',     require('./src/routes/auth'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/orders',   require('./src/routes/orders'));
app.use('/api/admin',    require('./src/routes/admin'));
app.use('/api/payment',  require('./src/routes/payment'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

sequelize.sync({ alter: false }).then(() => {
  console.log('DB synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('DB sync error:', err);
  process.exit(1);
});
