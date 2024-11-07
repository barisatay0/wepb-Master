const heicConvert = require('heic-convert');

const convertHeicToJpeg = async (fileBuffer, mimeType) => {
    if (mimeType === 'image/heic' || mimeType === 'image/heif') {
        return await heicConvert({
            buffer: fileBuffer,
            format: 'JPEG',
        });
    }
    return fileBuffer;
};

module.exports = {convertHeicToJpeg};
