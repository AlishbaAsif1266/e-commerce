const asyncHandler = require('express-async-handler');

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Public
const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    // req.file.path contains the Cloudinary URL
    res.status(200).json({
        message: 'Upload successful',
        url: req.file.path,
        id: req.file.filename
    });
});

module.exports = {
    uploadImage
};
