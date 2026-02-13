const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Route for single image upload
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // req.file.path contains the Cloudinary URL
    res.status(200).json({
      message: 'Upload successful',
      url: req.file.path,
      id: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;
