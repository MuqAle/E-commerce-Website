"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart-controller");
const cartRouter = express_1.default.Router();
cartRouter.put('/add/:id', cart_controller_1.addToCart);
cartRouter.put('/delete/:id', cart_controller_1.deleteFromCart);
cartRouter.put('/decrease/:id', cart_controller_1.reductionCart);
cartRouter.get('/', cart_controller_1.getAllCart),
    cartRouter.get('/user-cart', cart_controller_1.getUserCart);
exports.default = cartRouter;
