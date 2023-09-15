const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/images', imageController.getImages);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;
