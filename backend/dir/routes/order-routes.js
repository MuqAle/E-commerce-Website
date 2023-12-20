"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controllers_1 = require("../controllers/orders-controllers");
const orderRouter = express_1.default.Router();
orderRouter.get('/', orders_controllers_1.getAllOrders),
    orderRouter.get('/:id', orders_controllers_1.getOneOrder);
orderRouter.put('/:id', orders_controllers_1.updateOrder);
exports.default = orderRouter;
