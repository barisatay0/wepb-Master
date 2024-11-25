# WebPMaster - Image Conversion API

WebPMaster is a Node.js-based server that allows users to upload images, convert them to WebP format, and download them in a zip archive. The server can handle multiple image formats, including HEIC/HEIF, which are first converted to JPEG before being processed into WebP format. This API uses the `sharp` library for image processing and `heic-convert` for HEIC to JPEG conversion.

## Features

- Upload multiple images (up to 100).
- Converts HEIC/HEIF images to JPEG, then to WebP format.
- Returns converted images as a downloadable zip file.
- Built with Express and Multer for handling file uploads.

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/barisatay0/webpmaster.git
   ```

2. Navigate to the project directory:

   ```bash
   cd webpmaster
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node app.js
   ```

2. The server will start on `http://localhost:3001`.

3. To convert images:
   
   Send a `POST` request to `http://localhost:3001/convert` with an array of images in the form-data under the `images` key.

   **Example using curl:**

   ```bash
   curl -X POST -F "images=@image1.heic" -F "images=@image2.jpg" http://localhost:3001/convert --output converted_images.zip
   ```

   **Response:**

   - A `converted_images.zip` file containing the converted WebP images will be returned.

## Files and Structure

- **app.js**: Main application entry point, sets up the Express server and handles image uploads.
- **controller/imageController.js**: Handles the logic for converting images and creating the zip file.
- **service/imageProcessingService.js**: Contains the logic for converting images to WebP format using the `sharp` library.
- **service/heifService.js**: Converts HEIC/HEIF images to JPEG format using the `heic-convert` library.
- **node_modules**: Contains all project dependencies.
- **package.json**: Lists project metadata and dependencies.
- **package-lock.json**: Lock file for dependencies.

## Dependencies

- `express`: Web framework for Node.js
- `multer`: Middleware for handling file uploads
- `sharp`: Image processing library for converting images to WebP format
- `heic-convert`: Library to convert HEIC/HEIF images to JPEG format
- `archiver`: Used to create ZIP archives of the converted images

## Error Handling

- If no files are uploaded, the server responds with a `400` status and the message: `"No files uploaded."`
- If there's an issue during the image processing, the server responds with a `500` status and an error message.

