const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');

// Route for single image upload
router.post('/image', upload.single('image'), uploadImage);

module.exports = router;
