const router = require('express').Router();
const ctrl   = require('../controllers/productController');
const auth   = require('../middleware/auth');
const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

const uploadDir = path.join(__dirname, '../../uploads/products');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/',           ctrl.getAll);
router.get('/:slug',      ctrl.getOne);
router.post('/', auth, upload.array('images', 8), async (req, res, next) => {
  if (req.files?.length) {
    const urls = req.files.map(f => `/uploads/products/${f.filename}`);
    req.body.images = urls;
  }
  next();
}, ctrl.create);
router.put('/:id',   auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
