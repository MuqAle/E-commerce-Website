"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.userExtractor = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = __importDefault(require("../models/user-model"));
const config_1 = require("../config/config");
const tokenExtractor = (req, _res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer')) {
        req.token = authorization.replace('Bearer ', '');
    }
    else {
        req.token = null;
    }
    return next();
};
exports.tokenExtractor = tokenExtractor;
const userExtractor = async (req, res, next) => {
    try {
        if (req.token) {
            const decodedToken = (0, jsonwebtoken_1.verify)(req.token, config_1.SECRET);
            req.user = await user_model_1.default.findById(decodedToken.id)
                .populate({
                path: 'wishList',
                model: 'Product',
                select: 'name price stock images onSale salePercentage salePrice type'
            })
                .populate({
                path: 'reviews.product',
                model: 'Product',
                select: 'name price images onSale salePercentage salePrice type'
            })
                .populate({
                path: 'orders',
                model: 'Order',
                select: 'createdAt orderStatus total'
            });
        }
        return next();
    }
    catch (error) {
        return res.status(401).json({ Error: 'Token Invalid' });
    }
};
exports.userExtractor = userExtractor;
const isAdmin = (req, res, next) => {
    if (req.user) {
        if (req.user.isAdmin === false) {
            res.status(403).json({ Error: 'Access Denied: Not Admin' });
        }
        return next();
    }
    else {
        res.status(401).json({ Error: 'Access Denied: You Must Login' });
    }
};
exports.isAdmin = isAdmin;
