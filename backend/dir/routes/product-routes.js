"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product-controller");
const multer_middleware_1 = __importDefault(require("../middleware/multer-middleware"));
const jwt_middleware_1 = require("../middleware/jwt-middleware");
const productRouter = express_1.default.Router();
productRouter.get('/', product_controller_1.getAllProducts);
productRouter.get('/front-page-products', product_controller_1.getFrontPageProducts);
productRouter.get('/:id', product_controller_1.getProduct);
productRouter.delete('/:id', jwt_middleware_1.userExtractor, jwt_middleware_1.isAdmin, product_controller_1.deleteProduct);
productRouter.post('/', jwt_middleware_1.userExtractor, jwt_middleware_1.isAdmin, multer_middleware_1.default.array('images', 3), product_controller_1.addProduct);
productRouter.put('/:id', jwt_middleware_1.userExtractor, jwt_middleware_1.isAdmin, multer_middleware_1.default.array('images', 3), product_controller_1.updatedProducts);
exports.default = productRouter;
