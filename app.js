const express = require('express');
const multer = require('multer');
const imageController = require('./controller/imageController');

const app = express();
const PORT = 3001;

const storage = multer.memoryStorage();
const upload = multer({storage});

app.post('/convert', upload.array('images', 100), imageController.convertImages);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
