"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("../controllers/reviews-controller");
const wishlist_controller_1 = __importDefault(require("../controllers/wishlist-controller"));
const user_controller_1 = require("../controllers/user-controller");
const userReqRouter = express_1.default.Router();
userReqRouter.put('/add-reviews/:id', reviews_controller_1.postReview);
userReqRouter.put('/wishlist/:id', wishlist_controller_1.default);
userReqRouter.put('/delete-reviews/:id', reviews_controller_1.deleteReview);
userReqRouter.get('/profile', user_controller_1.getUserProfile);
userReqRouter.put('/change-profile', user_controller_1.changeUserProfile);
userReqRouter.put('/change-password', user_controller_1.changeUserPassword);
exports.default = userReqRouter;
