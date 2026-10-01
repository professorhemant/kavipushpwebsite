const router = require('express').Router();
const ctrl   = require('../controllers/orderController');
const auth   = require('../middleware/auth');
router.post('/',                    ctrl.create);
router.put('/:id/payment',          ctrl.updatePayment);
router.get('/',          auth,      ctrl.getAll);
router.get('/:id',       auth,      ctrl.getOne);
router.put('/:id/status', auth,     ctrl.updateStatus);
module.exports = router;
