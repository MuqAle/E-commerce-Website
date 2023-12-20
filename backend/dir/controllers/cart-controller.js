"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCart = exports.getAllCart = exports.reductionCart = exports.deleteFromCart = exports.addToCart = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const mongoose_1 = require("mongoose");
const cart_service_1 = require("../services/cart-service");
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const product_model_1 = __importDefault(require("../models/product-model"));
const session_model_1 = __importDefault(require("../models/session-model"));
const getAllCart = async (_req, res) => {
    const cart = await shopping_cart_model_1.default.find({}).populate('products.product', { name: 1, price: 1 });
    res.json(cart);
};
exports.getAllCart = getAllCart;
const getUserCart = async (req, res) => {
    try {
        if (req.user) {
            const cart = await shopping_cart_model_1.default.findById(req.user.shoppingCart).populate('products.product', {
                sold: 0,
                reviews: 0,
                imageFolder: 0
            });
            return res.json(cart);
        }
        if (req.session && req.session.guestCart) {
            const session = req.session.id;
            const sessionCart = await session_model_1.default.findById(session).populate('session.guestCart.products.product', {
                sold: 0,
                reviews: 0,
                imageFolder: 0
            });
            return res.json(sessionCart?.session.guestCart);
        }
        if (!req.session.guestCart) {
            const session = {
                products: [],
                cartPrice: 0,
                cartTotal: 0
            };
            req.session.guestCart = session;
            return res.json(req.session.guestCart);
        }
        else {
            return res.status(404).json({ Error: 'No shopping cart found' });
        }
    }
    catch (error) {
        return res.status(500).json({ Error: 'Internal System Error' });
    }
};
exports.getUserCart = getUserCart;
const addToCart = async (req, res, next) => {
    const productId = req.params.id;
    const cartItems = {
        product: new mongoose_1.Types.ObjectId(productId),
        quantity: 1
    };
    try {
        const product = await product_model_1.default.findById(productId);
        const user = req.user;
        if (product) {
            if (product.stock === 0) {
                res.status(400).json({ Error: 'Item Out Of Stock' });
            }
            else {
                if (user) {
                    const updatedCart = await (0, cart_service_1.addToCartUser)(user, productId, cartItems, product);
                    res.status(200).json(updatedCart);
                }
                else {
                    const guestItems = {
                        product: new mongoose_1.Types.ObjectId(productId),
                        quantity: 1
                    };
                    const guestCart = req.session.guestCart;
                    const newGuestCart = (0, cart_service_1.addToCartGuest)(guestCart, guestItems, productId, product);
                    const sessionCart = await session_model_1.default.findByIdAndUpdate(req.session.id, {
                        'session.guestCart': newGuestCart
                    }, { new: true,
                        runValidators: true,
                        context: 'query' })
                        .populate('session.guestCart.products.product', { stock: 0, sold: 0, reviews: 0, imageFolder: 0 });
                    res.status(200).json(sessionCart?.session.guestCart);
                }
            }
        }
        else {
            res.status(404).json({ Error: 'Item Not Found' });
        }
    }
    catch (error) {
        next();
    }
};
exports.addToCart = addToCart;
const deleteFromCart = async (req, res, next) => {
    const productId = req.params.id;
    const user = req.user;
    try {
        if (user) {
            const updatedCart = await (0, cart_service_1.deleteFromCartUser)(user, productId);
            if (updatedCart) {
                res.status(updatedCart.status).json(updatedCart.response);
            }
        }
        else {
            const guestCart = req.session.guestCart;
            if (guestCart.products.length <= 0) {
                res.status(400).json({ Error: 'No Items In Cart' });
            }
            const updatedCart = await (0, cart_service_1.deleteFromCartGuest)(guestCart, productId, req.session.id);
            res.status(updatedCart.status).json(updatedCart.response);
        }
    }
    catch (error) {
        next();
    }
};
exports.deleteFromCart = deleteFromCart;
const reductionCart = async (req, res, next) => {
    const productId = req.params.id;
    try {
        if (req.user) {
            const updatedCart = await (0, cart_service_1.reduceFromCartUser)(req.user, productId);
            if (updatedCart) {
                res.status(updatedCart?.status).json(updatedCart?.response);
            }
        }
        else {
            const guestCart = req.session.guestCart;
            if (guestCart) {
                if (guestCart.products.length < 1) {
                    res.status(400).json({ Error: 'No Items In Cart' });
                }
                else {
                    const updatedGuestCart = await (0, cart_service_1.reduceFromCartGuest)(guestCart, productId, req.session.id);
                    res.status(updatedGuestCart.status).json(updatedGuestCart.response);
                }
            }
        }
    }
    catch (error) {
        next();
        console.log(error);
    }
};
exports.reductionCart = reductionCart;
