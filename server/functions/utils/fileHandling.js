import sharp from "sharp";
import { bucket } from "../db/exporter.js";

async function uploadFileToStorage(filetoUpload, destinationPath) {
    const file = bucket.file(destinationPath);

    await file.save(filetoUpload);

    return file;
}

async function resizeFile(file) {
    const inputBuffer = file;

    // Resize and compress the image
    const outputFile = "output.jpg";
    await sharp(inputBuffer)
        .resize(100, 100)
        .jpeg({ quality: 80 })
        .toFile(outputFile);

    return outputFile;
}

export { uploadFileToStorage, resizeFile };
