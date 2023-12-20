"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product-model"));
const all_products_1 = __importDefault(require("../assets/data/all-products"));
const uuid_1 = require("uuid");
const cloudinary_1 = require("cloudinary");
const config_1 = require("./../config/config");
const rounding_1 = __importDefault(require("./rounding"));
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_NAME,
    api_key: config_1.CLOUDINARY_KEY,
    api_secret: config_1.CLOUDINARY_SECRET
});
const importData = async () => {
    for (const entry of all_products_1.default) {
        const { name, type, price, onSale, salePercentage, description, stock, metal, colors, images } = entry;
        const uuid = (0, uuid_1.v4)();
        const path = __dirname.replace('/utils', '');
        const imagePath = await Promise.all(images.map(async (file) => {
            try {
                const image = await cloudinary_1.v2.uploader.upload(path + '/assets/imgs/' + file, {
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
        const product = new product_model_1.default({
            name,
            type,
            price,
            onSale,
            salePercentage,
            salePrice: onSale ? (0, rounding_1.default)(price * salePercentage, 2) : undefined,
            stock,
            metal,
            colors,
            description,
            images: imagePath,
            imageFolder: uuid
        });
        try {
            await product.save();
            console.log(`Product:${name} has been added to MongoDB`);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('Error: could not be uploaded');
            }
        }
    }
    console.log('inventory has been saved to MongoDb');
};
exports.default = importData;
