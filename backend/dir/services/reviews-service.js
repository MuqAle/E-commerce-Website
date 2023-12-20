"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductReview = exports.addNewRating = exports.updatedRating = exports.updateProductRating = void 0;
const product_model_1 = __importDefault(require("../models/product-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const rounding_1 = __importDefault(require("../utils/rounding"));
const mongoose_1 = require("mongoose");
const updatedRating = async (id) => {
    const getAllReviews = await product_model_1.default.findById(id).populate('reviews.postedBy', { firstName: 1, lastName: 1 });
    const totalReviews = getAllReviews?.reviews.length;
    let actualRating = 0;
    if (totalReviews && totalReviews > 0) {
        const reviewSum = getAllReviews?.reviews.map((product) => product.rating)
            .reduce((prev, curr) => prev + curr, 0);
        if (reviewSum && totalReviews) {
            actualRating = (0, rounding_1.default)((reviewSum / totalReviews), 1);
        }
    }
    if (getAllReviews) {
        getAllReviews.overallRating = actualRating;
    }
    const product = await getAllReviews?.save();
    return product;
};
exports.updatedRating = updatedRating;
const updateProductRating = async (alreadyRated, rating, reviewTitle, reviewDesc, id) => {
    await product_model_1.default.updateOne({
        reviews: {
            $elemMatch: alreadyRated
        },
    }, {
        $set: {
            "reviews.$.rating": rating,
            "reviews.$.reviewDesc": reviewDesc,
            "reviews.$.reviewTitle": reviewTitle
        }
    }, {
        new: true,
        context: "query"
    });
    await user_model_1.default.updateOne({
        reviews: {
            $elemMatch: {
                product: id
            }
        }
    }, {
        $set: {
            "reviews.$.rating": rating,
            "reviews.$.reviewDesc": reviewDesc,
            "reviews.$.reviewTitle": reviewTitle
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    });
};
exports.updateProductRating = updateProductRating;
const addNewRating = async (id, user, rating, reviewTitle, reviewDesc) => {
    await product_model_1.default.findByIdAndUpdate(id, {
        $push: {
            reviews: {
                $each: [{
                        postedBy: user.id,
                        rating: rating,
                        reviewDesc: reviewDesc,
                        reviewTitle: reviewTitle,
                    }],
                $position: 0
            }
        },
        new: true,
        runValidators: true,
        context: 'query'
    });
    if (user.reviews) {
        user.reviews.unshift({
            product: new mongoose_1.Types.ObjectId(id),
            reviewDesc: reviewDesc,
            reviewTitle: reviewTitle,
            rating: rating,
        });
        await user.save();
    }
};
exports.addNewRating = addNewRating;
const deleteProductReview = async (product, reviewPosted, user, id) => {
    const productIndex = product.reviews.findIndex(review => review.postedBy === reviewPosted.postedBy);
    product.reviews.splice(productIndex, 1);
    if (user.reviews) {
        const userIndex = user.reviews.findIndex(review => review.product.toString() === id);
        user.reviews.splice(userIndex, 1);
    }
    await user.save();
    await product.save();
};
exports.deleteProductReview = deleteProductReview;
