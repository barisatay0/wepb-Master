const express = require('express');
const multer = require('multer');
const heif_Convert = require('heic-convert');
const sharp = require('sharp');

const app = express();
const PORT = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const convertImage = async (fileBuffer, mimeType) => {
    if (mimeType === 'image/heic' || mimeType === 'image/heif') {
        return await heif_Convert({
            buffer: fileBuffer,
            format: 'JPEG',
        });
    }
    return fileBuffer;
};

app.post('/convert', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const jpegBuffer = await convertImage(req.file.buffer, req.file.mimetype);
        const webpBuffer = await sharp(jpegBuffer).toFormat('webp').toBuffer();

        res.set('Content-Type', 'image/webp');
        res.set('Content-Disposition', 'attachment; filename=converted.webp');
        res.send(webpBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the image.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
