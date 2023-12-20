"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImages = exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("./../config/config");
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_NAME,
    api_key: config_1.CLOUDINARY_KEY,
    api_secret: config_1.CLOUDINARY_SECRET
});
const uploadImage = async (files, uuid) => {
    const imagePath = await Promise.all(files.map(async (file) => {
        try {
            const image = await cloudinary_1.v2.uploader.upload(file.path, {
                folder: `online-store/${uuid}`,
                width: 880,
                height: 1050,
                crop: "fill"
            });
            return image.secure_url;
        }
        catch (error) {
            return error;
        }
    }));
    return imagePath;
};
exports.uploadImage = uploadImage;
const deleteImage = async (filePath) => {
    try {
        await cloudinary_1.v2.api.delete_resources_by_prefix(filePath, {
            type: 'upload'
        });
        await cloudinary_1.v2.api.delete_folder(filePath);
        return;
    }
    catch (error) {
        return error;
    }
};
exports.deleteImage = deleteImage;
const updateImages = async (filePath, fullFilePath, files) => {
    try {
        await cloudinary_1.v2.api.delete_resources_by_prefix(fullFilePath, {
            type: 'upload'
        });
        const newImages = await uploadImage(files, filePath);
        return newImages;
    }
    catch (error) {
        return error;
    }
};
exports.updateImages = updateImages;
