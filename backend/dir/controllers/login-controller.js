"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const user_model_1 = __importDefault(require("../models/user-model"));
const config_1 = require("../config/config");
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const rounding_1 = __importDefault(require("../utils/rounding"));
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email });
    const passwordCorrect = user === null
        ? false
        : await (0, bcrypt_1.compare)(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            Error: 'Invalid Email Or Password'
        });
    }
    const userForToken = {
        email: user.email,
        id: user._id
    };
    const token = (0, jsonwebtoken_1.sign)(userForToken, config_1.SECRET);
    const cart = await shopping_cart_model_1.default.findById(user.shoppingCart);
    const session = req.session.guestCart;
    if (session && cart) {
        if (cart.products.length === 0) {
            await shopping_cart_model_1.default.findByIdAndUpdate(user.shoppingCart, {
                products: [...(cart.products), ...(session.products)],
                cartTotal: cart.cartTotal + session.cartTotal,
                cartPrice: (0, rounding_1.default)(cart.cartPrice + session.cartPrice, 2)
            });
        }
        else {
            const indexedArray1 = new Map(cart.products.map((item) => [item.product.toString(), item]));
            for (const item2 of session.products) {
                const productIdStr = item2.product.toString();
                if (indexedArray1.has(productIdStr)) {
                    const item1 = indexedArray1.get(productIdStr);
                    item1 && (item1.quantity += item2.quantity);
                }
                else {
                    cart.products.push(item2);
                }
            }
            cart.cartTotal += session.cartTotal;
            cart.cartPrice += session.cartPrice;
            cart.cartPrice = (0, rounding_1.default)(cart.cartPrice, 2);
            await cart.save();
        }
        res.clearCookie('connect.sid', { path: '/' });
        req.session.destroy(err => {
            if (err) {
                res.send(err);
            }
        });
    }
    return res.status(200).send({
        token,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        isAdmin: user.isAdmin,
    });
};
exports.default = loginUser;
