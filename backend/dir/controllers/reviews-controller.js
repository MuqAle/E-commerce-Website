"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.postReview = void 0;
const product_model_1 = __importDefault(require("../models/product-model"));
const reviews_service_1 = require("../services/reviews-service");
const postReview = async (req, res, next) => {
    try {
        const { user } = req;
        const id = req.params.id;
        const body = req.body;
        const product = await product_model_1.default.findById(id);
        if (product) {
            const alreadyRated = product?.reviews?.find(userId => userId.postedBy.toString() === user.id.toString());
            if (alreadyRated) {
                await (0, reviews_service_1.updateProductRating)(alreadyRated, body.rating, body.reviewTitle, body.reviewDesc, id);
            }
            else {
                await (0, reviews_service_1.addNewRating)(id, user, body.rating, body.reviewTitle, body.reviewDesc);
            }
            const finalProduct = await (0, reviews_service_1.updatedRating)(id);
            res.json(finalProduct);
        }
        else {
            res.status(404).json({ Error: 'Item Not Found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.postReview = postReview;
const deleteReview = async (req, res, next) => {
    try {
        const { user } = req;
        const id = req.params.id;
        const product = await product_model_1.default.findById(id);
        const reviewPosted = product?.reviews?.find(userId => userId.postedBy.toString() === user.id.toString());
        if (reviewPosted && (product && product.reviews) && user.reviews) {
            await (0, reviews_service_1.deleteProductReview)(product, reviewPosted, user, id);
            const finalProduct = await (0, reviews_service_1.updatedRating)(id);
            res.json(finalProduct);
        }
        else {
            res.status(404).json({ Error: 'No Review Or Product Found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReview = deleteReview;
