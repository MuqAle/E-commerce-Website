"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const jwt_middleware_1 = require("../middleware/jwt-middleware");
const userRouter = express_1.default.Router();
userRouter.get('/', user_controller_1.getUsers);
userRouter.post('/', user_controller_1.addUser);
userRouter.delete('/', jwt_middleware_1.userExtractor, user_controller_1.deleteUser);
exports.default = userRouter;
