const sharp = require('sharp');

const convertToWebp = async (jpegBuffer) => {
    return await sharp(jpegBuffer).toFormat('webp').toBuffer();
};

module.exports = {convertToWebp};
