"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrontPageProducts = exports.updatedProducts = exports.addProduct = exports.deleteProduct = exports.getProduct = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product-model"));
const cloudinary_1 = require("../utils/cloudinary");
const product_service_1 = require("../services/product-service");
const getAllProducts = async (req, res, next) => {
    const page = req.query.page;
    const sortBy = req.query.sort || '-sold';
    const { category, minPrice, maxPrice, onSale, keyword } = req.query;
    const colors = req.query.colors ? req.query.colors.split(',') : [];
    const metal = req.query.metal ? req.query.metal.split(',') : [];
    const itemsPerPage = 20;
    const skip = (+page - 1) * itemsPerPage;
    const filter = {};
    try {
        if (keyword) {
            filter.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { type: { $regex: keyword, $options: 'i' } },
                { colors: { $regex: keyword, $options: 'i' } },
                { metal: { $regex: keyword, $options: 'i' } }
            ];
        }
        if (category) {
            filter.type = category;
        }
        if (minPrice) {
            filter.price = { $gt: +minPrice };
        }
        if (minPrice && maxPrice) {
            filter.price = { $gte: +minPrice, $lte: +maxPrice };
        }
        if (colors.length > 0) {
            filter.colors = { $in: colors };
        }
        if (onSale) {
            filter.onSale = onSale === 'true';
        }
        if (metal.length > 0) {
            filter.metal = { $in: metal };
        }
        const totalProducts = await product_model_1.default.countDocuments(filter);
        const filterKeys = ['colors', 'metal', 'priceRange'];
        const aggregate = [
            {
                $match: filter
            },
            {
                $facet: {}
            }
        ];
        const facetStage = aggregate[1];
        for (const filterKey of filterKeys) {
            if (filterKey !== 'priceRange') {
                facetStage.$facet[filterKey] = [
                    {
                        $unwind: `$${filterKey}`
                    },
                    {
                        $sortByCount: `$${filterKey}`
                    },
                    {
                        $project: {
                            _id: 0,
                            filter: '$_id',
                            count: 1
                        }
                    },
                    {
                        $sort: { filter: 1 }
                    }
                ];
            }
            else if (filterKey === 'priceRange') {
                facetStage.$facet[filterKey] = [
                    {
                        $group: {
                            _id: {
                                $switch: {
                                    branches: [
                                        { case: { $gt: ['$price', 30] }, then: 'Above $30' },
                                        { case: { $and: [{ $gte: ['$price', 21] }, { $lte: ['$price', 30] }] }, then: '21-$30' },
                                        { case: { $and: [{ $gte: ['$price', 11] }, { $lte: ['$price', 20] }] }, then: '11-$20' },
                                        { case: { $and: [{ $gte: ['$price', 0] }, { $lte: ['$price', 10] }] }, then: '1-$10' },
                                    ],
                                    default: 'No products found'
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            filter: '$_id',
                            count: 1
                        }
                    },
                    {
                        $sort: { filter: 1 }
                    }
                ];
            }
        }
        const productAggregate = await product_model_1.default.aggregate(aggregate).exec();
        const product = await product_model_1.default.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(20)
            .exec();
        res.status(200).json({ product, totalProducts, productAggregate });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
const getProduct = async (req, res, next) => {
    try {
        const product = await product_model_1.default.findById(req.params.id).populate('reviews.postedBy', { firstName: 1, lastName: 1 });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).end();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getProduct = getProduct;
const getFrontPageProducts = async (_req, res, next) => {
    const limit = 7;
    try {
        const newProducts = await product_model_1.default.find({})
            .sort('-createdAt')
            .limit(limit)
            .exec();
        const onSaleProducts = await product_model_1.default.find({ onSale: true })
            .sort('-stock')
            .limit(limit)
            .exec();
        const trendingProducts = await product_model_1.default.find({})
            .sort('-sold')
            .limit(limit)
            .exec();
        if (!newProducts || !onSaleProducts || !trendingProducts) {
            res.status(404).end();
        }
        else {
            res.status(200).json({ newProducts, onSaleProducts, trendingProducts });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getFrontPageProducts = getFrontPageProducts;
const addProduct = async (req, res, next) => {
    try {
        const body = req.body;
        const files = req.files;
        const saveProduct = await (0, product_service_1.addProductDB)(body, files);
        res.status(201).json(saveProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.addProduct = addProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await product_model_1.default.findById(id);
        const fullFolderPath = `online-store/${product?.imageFolder}/`;
        if (product) {
            await (0, product_service_1.deleteProductSession)(product, id);
            await (0, product_service_1.deleteProductReviews)(id);
            await (0, product_service_1.deleteProductUser)(product, id);
            await (0, cloudinary_1.deleteImage)(fullFolderPath);
            await product_model_1.default.findByIdAndRemove(req.params.id);
            res.status(204).end();
        }
        else {
            res.status(404).json({ Error: 'Item Not Found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
const updatedProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const files = req.files;
        const changeProduct = await (0, product_service_1.updateProductDB)(body, id, files);
        if (!changeProduct) {
            res.status(404).json({ Error: 'Item Not Found' });
        }
        else {
            res.json(changeProduct);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updatedProducts = updatedProducts;
