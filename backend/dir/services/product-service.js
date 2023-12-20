"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductDB = exports.deleteProductReviews = exports.deleteProductUser = exports.deleteProductSession = exports.addProductDB = void 0;
const session_model_1 = __importDefault(require("../models/session-model"));
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const product_model_1 = __importDefault(require("../models/product-model"));
const rounding_1 = __importDefault(require("../utils/rounding"));
const uuid_1 = require("uuid");
const cloudinary_1 = require("../utils/cloudinary");
const addProductDB = async (body, files) => {
    const uuid = (0, uuid_1.v4)();
    const imagePath = await (0, cloudinary_1.uploadImage)(files, uuid);
    const newProduct = new product_model_1.default({
        name: body.name,
        type: body.type,
        price: body.price,
        onSale: body.onSale,
        salePercentage: body.salePercentage,
        salePrice: (0, rounding_1.default)(body.price * body.salePercentage, 2),
        description: body.description,
        stock: body.stock,
        metal: body.metal,
        colors: body.colors,
        images: imagePath,
        imageFolder: uuid
    });
    const saveProduct = await newProduct.save();
    return saveProduct;
};
exports.addProductDB = addProductDB;
const deleteProductSession = async (product, id) => {
    const sessions = await session_model_1.default.find({ 'session.guestCart.products.product': id });
    for (const session of sessions) {
        const sessionCart = session.session.guestCart;
        const productRemove = sessionCart.products.find(product => product.product.toString() === id);
        if (productRemove) {
            const quantityRemove = productRemove.quantity;
            const totalPrice = (0, rounding_1.default)(quantityRemove * (product.onSale ?
                product.salePrice :
                product.price), 2);
            sessionCart.cartTotal -= quantityRemove;
            sessionCart.cartPrice -= totalPrice;
            sessionCart.cartPrice = (0, rounding_1.default)(sessionCart.cartPrice, 2);
            const index = sessionCart.products.findIndex(product => product.product.toString() === id);
            sessionCart.products.splice(index, 1);
            await session.save();
        }
    }
};
exports.deleteProductSession = deleteProductSession;
const deleteProductUser = async (product, id) => {
    const carts = await shopping_cart_model_1.default.find({ 'products.product': id });
    for (const cart of carts) {
        const productRemove = cart.products.find(product => product.product.toString() === id);
        if (productRemove && product) {
            const quantityRemove = productRemove.quantity;
            const totalPrice = (0, rounding_1.default)(quantityRemove * (product.onSale ?
                product.salePrice :
                product.price), 2);
            cart.cartTotal -= quantityRemove;
            cart.cartPrice -= totalPrice;
            cart.cartPrice = (0, rounding_1.default)(cart.cartPrice, 2);
            const index = cart.products.findIndex(product => product.product.toString() === id);
            cart.products.splice(index, 1);
            await cart.save();
        }
    }
};
exports.deleteProductUser = deleteProductUser;
const deleteProductReviews = async (id) => {
    const users = await user_model_1.default.find({ 'reviews.product': id });
    for (const user of users) {
        if (user.reviews) {
            const index = user.reviews.findIndex(review => review.product.toString() === id);
            user.reviews.splice(index, 1);
        }
    }
};
exports.deleteProductReviews = deleteProductReviews;
const updateProductDB = async (body, id, files) => {
    let images;
    if (files) {
        const product = await product_model_1.default.findById(id);
        const folderPath = `${product?.imageFolder}`;
        const fullFilePath = `online-store/${product?.imageFolder}/`;
        images = await (0, cloudinary_1.updateImages)(folderPath, fullFilePath, files);
    }
    const product = {
        name: body.name,
        type: body.type,
        price: body.price,
        onSale: body.onSale,
        salePercentage: body.salePercentage,
        description: body.description,
        stock: body.stock,
        sold: body.sold,
        metal: body.metal,
        colors: body.colors,
        images: images
    };
    const changeProduct = await product_model_1.default.findByIdAndUpdate(id, product, { new: true,
        runValidators: true,
        context: 'query' });
    return changeProduct;
};
exports.updateProductDB = updateProductDB;
