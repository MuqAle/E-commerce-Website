"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderLogic = exports.filterBody = void 0;
const orders_model_1 = __importDefault(require("../models/orders-model"));
const filterBody = (body) => {
    const allowedFields = ['name', 'email', 'orderStatus'];
    const disallowedFields = Object.keys(body).filter((field) => !allowedFields.includes(field));
    return disallowedFields;
};
exports.filterBody = filterBody;
const updateOrderLogic = async (name, email, orderStatus, id) => {
    const order = {
        name: name,
        email: email,
        orderStatus: orderStatus
    };
    const changeProduct = await orders_model_1.default.findByIdAndUpdate(id, order, { new: true,
        runValidators: true,
        context: 'query' });
    return changeProduct;
};
exports.updateOrderLogic = updateOrderLogic;
