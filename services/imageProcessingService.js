const sharp = require('sharp');

const convertToWebp = async (buffer) => {
    return sharp(buffer).toFormat('webp').toBuffer();
};

module.exports = {convertToWebp};
