const heicConvert = require('heic-convert');

const convertHeicToJpeg = async (fileBuffer, mimeType) => {
    if (['image/heic', 'image/heif'].includes(mimeType)) {
        return heicConvert({
            buffer: fileBuffer,
            format: 'JPEG',
        });
    }
    return fileBuffer;
};

module.exports = {convertHeicToJpeg};
