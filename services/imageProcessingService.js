const sharp = require('sharp');

const convertToWebp = (buffer) => sharp(buffer).webp().toBuffer();

module.exports = { convertToWebp };
