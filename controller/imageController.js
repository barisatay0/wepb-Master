const {convertHeifToJpeg} = require('../service/heifService');
const {convertToWebp} = require('../service/imageProcessingService');
const archiver = require('archiver');

const convertImages = async (req, res) => {
    if (!req.files || req.files.length === 0) return res.status(400).send('No files uploaded.');

    try {
        const webpBuffers = await Promise.all(req.files.map(async (file, index) => {
            const jpegBuffer = await convertHeifToJpeg(file.buffer, file.mimetype);
            const webpBuffer = await convertToWebp(jpegBuffer);
            return {buffer: webpBuffer, name: `converted_${index + 1}.webp`};
        }));

        res.set('Content-Type', 'application/zip');
        res.set('Content-Disposition', 'attachment; filename=converted_images.zip');

        const archive = archiver('zip', {zlib: {level: 9}});
        archive.pipe(res);

        webpBuffers.forEach(({buffer, name}) => archive.append(buffer, {name}));
        archive.finalize();

    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).send(`Error processing the images: ${error.message}`);
    }
};

module.exports = {convertImages};
