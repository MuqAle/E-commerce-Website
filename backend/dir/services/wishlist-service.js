"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.addToWishlist = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const addToWishlist = async (id, prodId) => {
    const user = await user_model_1.default.findByIdAndUpdate(id, {
        $push: { wishList: prodId }
    }, {
        new: true
    }).populate({
        path: 'wishList',
        model: 'Product',
        select: 'name price images onSale salePercentage salePrice type stock'
    });
    return user;
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (id, prodId) => {
    const user = await user_model_1.default.findByIdAndUpdate(id, {
        $pull: { wishList: prodId }
    }, {
        new: true
    }).populate({
        path: 'wishList',
        model: 'Product',
        select: 'name price images onSale salePercentage salePrice type stock'
    });
    return user;
};
exports.removeFromWishlist = removeFromWishlist;
