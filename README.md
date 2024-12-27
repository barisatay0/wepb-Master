# WebPMaster - Image Conversion API

WebPMaster is a Node.js-based server that provides a powerful image conversion service. It allows users to upload images, converts them to the WebP format, and returns them as a downloadable zip archive. The server supports multiple image formats, including HEIC and HEIF. These formats are first converted to JPEG and then processed into WebP format before being included in the zip archive.

The API is built with **Express** and uses **Multer** for handling file uploads, **Sharp** for image processing, and **Heic-convert** for converting HEIC/HEIF images to JPEG format.

## Features

- Upload multiple images (up to 100).
- Automatically converts HEIC/HEIF images to JPEG, and then to WebP format.
- Returns the converted WebP images in a zip file for easy download.
- Built using **Express** for the server, and **Multer** for handling uploads.
- **Sharp** is used for fast and efficient image processing into WebP format.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

## Installation

### Option 1: Install via npm

1. Install the package:
   ```bash
   npm i webpmaster
   ```

### Option 2: Clone the repository

1. Clone the repository:
   ```bash
   git clone https://github.com/barisatay0/webpmaster.git
   ```

2. Navigate to the project directory:
   ```bash
   cd webpmaster
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node app.js
   ```

2. The server will start on `http://localhost:3001`.

3. **To convert images:**

   Send a `POST` request to `http://localhost:3001/convert` with the images to be converted under the `images` key. You can upload multiple images, and they will be converted to WebP format.

### Example using `curl`:

```bash
curl -X POST -F "images=@image1.heic" -F "images=@image2.jpg" http://localhost:3001/convert --output converted_images.zip
```

This command sends `image1.heic` and `image2.jpg` to the server, and the converted images will be returned as a `converted_images.zip` file containing the WebP versions of the uploaded images.

### Response:

- The server will respond with a downloadable zip file named `converted_images.zip`, containing all the converted WebP images.

## File Structure

- **app.js**: The main entry point for the application. It sets up the Express server, handles incoming requests, and processes image uploads.
- **controller/imageController.js**: Contains the logic for processing images, converting them to WebP format, and bundling them into a zip file for download.
- **service/imageProcessingService.js**: Contains functions for converting images to WebP format using the **Sharp** library.
- **service/heifService.js**: Handles the conversion of HEIC/HEIF images to JPEG format using the **heic-convert** library.
- **node_modules/**: Contains all the dependencies required for the project.
- **package.json**: Contains the project metadata and dependency details.
- **package-lock.json**: Lock file to ensure consistent versions of dependencies across different environments.

## Dependencies

- **express**: Web framework for Node.js.
- **multer**: Middleware for handling multipart/form-data, primarily used for uploading files.
- **sharp**: Fast image processing library for converting images to the WebP format.
- **heic-convert**: Converts HEIC/HEIF images to JPEG format.
- **archiver**: Used to create ZIP archives containing the converted images.

## Error Handling

- If no files are uploaded, the server responds with a `400` status and the message: `"No files uploaded."`
- If there is an error during image processing, the server will respond with a `500` status and an error message that provides details about the failure.

## Example Error Message

If the wrong field is uploaded (e.g., an unexpected form field), the server may respond with an error like:

```html
MulterError: Unexpected field
```

This message indicates that the form field used for the file upload is not what was expected. Make sure the form field's `name` attribute matches the one specified in the API (in this case, `images`).

---
