const express = require('express');
const multer = require('multer');
const heifConvert = require('heic-convert');
const sharp = require('sharp');

const app = express();
const PORT = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const convertHeicToJpeg = async (fileBuffer, mimeType) => {
    if (mimeType === 'image/heic' || mimeType === 'image/heif') {
        return await heifConvert({
            buffer: fileBuffer,
            format: 'JPEG',
        });
    }
    return fileBuffer;
};

const convertToWebp = async (jpegBuffer) => {
    return await sharp(jpegBuffer).toFormat('webp').toBuffer();
};

app.post('/convert', upload.single('image'), async (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
