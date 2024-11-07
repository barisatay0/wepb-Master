const {convertHeicToJpeg} = require('../services/heicService');
const {convertToWebp} = require('../services/imageProcessingService');

const convertImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const jpegBuffer = await convertHeicToJpeg(req.file.buffer, req.file.mimetype);

        const webpBuffer = await convertToWebp(jpegBuffer);

        res.set('Content-Type', 'image/webp');
        res.set('Content-Disposition', 'attachment; filename=converted.webp');
        return res.send(webpBuffer);
    } catch (error) {
        console.error('Error processing the image:', error);
        return res.status(500).send('Error processing the image.');
    }
};

module.exports = {convertImage};
