"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getOneOrder = exports.getAllOrders = void 0;
const orders_model_1 = __importDefault(require("../models/orders-model"));
const order_service_1 = require("../services/order-service");
const getAllOrders = async (_req, res) => {
    const allOrders = await orders_model_1.default.find({}).populate({
        path: 'products.product',
        model: 'Product',
        select: 'name price images onSale salePercentage salePrice type'
    });
    res.json(allOrders);
};
exports.getAllOrders = getAllOrders;
const getOneOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await orders_model_1.default.findById(id).populate({
            path: 'products.product',
            model: 'Product',
            select: 'name price images onSale salePercentage salePrice type'
        });
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ Error: 'Order Not Found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getOneOrder = getOneOrder;
const updateOrder = async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    const disallowedFields = (0, order_service_1.filterBody)(body);
    if (disallowedFields.length > 3) {
        return res.status(400).json({
            Error: 'Invalid fields in the request: ' + disallowedFields.join(', '),
        });
    }
    try {
        const updatedProduct = await (0, order_service_1.updateOrderLogic)(body.name, body.email, body.orderStatus, id);
        if (!updatedProduct) {
            return res.status(404).json({ Error: 'Order Not Found' });
        }
        return res.json(updatedProduct);
    }
    catch (error) {
        return next(error);
    }
};
exports.updateOrder = updateOrder;
