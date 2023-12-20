"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserDB = exports.createUser = void 0;
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const product_model_1 = __importDefault(require("../models/product-model"));
const rounding_1 = __importDefault(require("../utils/rounding"));
const createUser = async (email, firstName, lastName, passwordHash, isAdmin) => {
    const user = new user_model_1.default({
        email,
        firstName,
        lastName,
        passwordHash,
        shoppingCart: null,
        isAdmin
    });
    const savedUser = await user.save();
    const cart = new shopping_cart_model_1.default({
        products: [],
        cartTotal: 0,
        cartPrice: 0,
        user: savedUser
    });
    const savedCart = await cart.save();
    const newUser = await user_model_1.default.findByIdAndUpdate(savedUser, { shoppingCart: savedCart }, { new: true });
    return newUser;
};
exports.createUser = createUser;
const deleteUserDB = async (userId, cartId) => {
    const products = await product_model_1.default.find({ 'reviews.postedBy': userId });
    await shopping_cart_model_1.default.findOneAndRemove(cartId);
    for (const product of products) {
        if (product.reviews) {
            const index = product.reviews.findIndex(review => review.postedBy.toString() === userId.toString());
            product.reviews.splice(index, 1);
            const updatedProduct = await product.save();
            const totalReviews = updatedProduct.reviews.length;
            const reviewSum = updatedProduct.reviews.map((product) => product.rating)
                .reduce((prev, curr) => prev + curr, 0);
            if (totalReviews === 0) {
                updatedProduct.overallRating = 0;
            }
            else {
                const actualRating = (0, rounding_1.default)((reviewSum / totalReviews), 2);
                updatedProduct.overallRating = actualRating;
            }
            await updatedProduct.save();
        }
    }
    await user_model_1.default.findByIdAndRemove(userId);
};
exports.deleteUserDB = deleteUserDB;
