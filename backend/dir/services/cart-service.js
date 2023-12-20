"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceFromCartUser = exports.reduceFromCartGuest = exports.deleteFromCartGuest = exports.deleteFromCartUser = exports.addToCartGuest = exports.addToCartUser = void 0;
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const rounding_1 = __importDefault(require("../utils/rounding"));
const product_model_1 = __importDefault(require("../models/product-model"));
const session_model_1 = __importDefault(require("../models/session-model"));
const addToCartUser = async (user, productId, cartItems, product) => {
    const cart = await shopping_cart_model_1.default.findById(user.shoppingCart).populate('products.product', { price: 1, name: 1, onSale: 1, salePercentage: 1, salePrice: 1, images: 1 });
    const foundObject = cart?.products.
        find(product => productId === product.product.id.toString());
    let updatedCart;
    if (!foundObject) {
        updatedCart = await shopping_cart_model_1.default.findByIdAndUpdate(cart?._id, {
            $push: { products: cartItems },
            $inc: { cartTotal: cartItems.quantity, cartPrice: product.onSale ?
                    product.salePrice
                    :
                        product.price },
        }, {
            new: true
        }).populate('products.product', { price: 1, name: 1, onSale: 1, salePercentage: 1, salePrice: 1, images: 1 });
        if (updatedCart) {
            updatedCart.cartPrice = (0, rounding_1.default)(updatedCart.cartPrice, 2);
            updatedCart = await updatedCart.save();
        }
    }
    else {
        foundObject.quantity += 1;
        if (cart && foundObject) {
            cart.cartPrice += foundObject.product.onSale ?
                foundObject.product.salePrice
                :
                    foundObject.product.price;
            cart.cartPrice = (0, rounding_1.default)(cart.cartPrice, 2);
            cart.cartTotal += 1;
            updatedCart = await cart.save();
        }
    }
    return updatedCart;
};
exports.addToCartUser = addToCartUser;
const addToCartGuest = (guestCart, cartItems, productId, product) => {
    const foundObject = guestCart?.products?.
        find(product => productId === product.product.toString());
    if (!guestCart) {
        guestCart = {
            products: [],
            cartPrice: 0,
            cartTotal: 0
        };
    }
    if (foundObject && guestCart) {
        foundObject.quantity += 1;
        guestCart.cartPrice += product.onSale ?
            product.salePrice
            :
                product.price;
        guestCart.cartTotal += 1;
        guestCart.cartPrice = (0, rounding_1.default)(guestCart.cartPrice, 2);
    }
    else {
        guestCart.products.push(cartItems);
        guestCart.cartPrice += product.onSale ?
            product.salePrice
            :
                product.price;
        guestCart.cartTotal += 1;
    }
    guestCart.cartPrice = (0, rounding_1.default)(guestCart.cartPrice, 2);
    return guestCart;
};
exports.addToCartGuest = addToCartGuest;
const deleteFromCartUser = async (user, productId) => {
    const userShopping = user.shoppingCart;
    const cart = await shopping_cart_model_1.default.findById(userShopping).populate('products.product', { price: 1, name: 1, onSale: 1, salePercentage: 1, salePrice: 1, images: 1 });
    const foundObject = cart?.products.
        find(product => productId === product.product.id.toString());
    if (!foundObject) {
        return ({
            status: 404,
            response: { Error: 'Item Not Found' }
        });
    }
    if (cart && cart?.products.length < 1) {
        return ({
            status: 400,
            response: { Error: 'No Items In Cart' }
        });
    }
    else {
        if (foundObject) {
            const updatedCart = await shopping_cart_model_1.default.findByIdAndUpdate(cart?._id, {
                $pull: { products: { product: productId } },
                $inc: { cartTotal: -foundObject?.quantity, cartPrice: (0, rounding_1.default)(foundObject.product.onSale ?
                        (0, rounding_1.default)(-(foundObject.product.salePrice * foundObject.quantity), 2)
                        :
                            (0, rounding_1.default)(-(foundObject.product.price * foundObject.quantity), 2), 2)
                },
            }, {
                new: true
            }).populate('products.product', { price: 1, name: 1, onSale: 1, salePercentage: 1, salePrice: 1, images: 1 });
            if (updatedCart) {
                updatedCart.cartPrice = (0, rounding_1.default)(updatedCart.cartPrice, 2);
                const savedCart = await updatedCart.save();
                return ({
                    status: 200,
                    response: savedCart
                });
            }
        }
        return;
    }
};
exports.deleteFromCartUser = deleteFromCartUser;
const deleteFromCartGuest = async (guestCart, productId, sessionId) => {
    const foundProduct = guestCart.products.find(product => productId === product.product.toString());
    const product = await product_model_1.default.findById(foundProduct?.product);
    if (guestCart.products.length <= 0) {
        return ({
            status: 400,
            response: { Error: 'No Items In Cart' }
        });
    }
    if (foundProduct && product) {
        const index = guestCart.products.findIndex(product => product.product.toString() === productId);
        guestCart.products.splice(index, 1);
        guestCart.cartPrice -= product?.onSale ?
            (0, rounding_1.default)(product.salePrice * foundProduct.quantity, 2) :
            (0, rounding_1.default)(product.price * foundProduct.quantity, 2);
        guestCart.cartPrice = (0, rounding_1.default)(guestCart.cartPrice, 2);
        guestCart.cartTotal -= foundProduct.quantity;
        const newSessionCart = await session_model_1.default.findByIdAndUpdate(sessionId, { 'session.guestCart': guestCart }, { new: true,
            runValidators: true,
            context: 'query' }).populate('session.guestCart.products.product', { stock: 0, sold: 0, reviews: 0, imageFolder: 0 });
        return ({
            status: 200,
            response: newSessionCart?.session.guestCart
        });
    }
    else {
        return ({
            status: 400,
            response: { Error: 'Item Not Found' }
        });
    }
};
exports.deleteFromCartGuest = deleteFromCartGuest;
const reduceFromCartUser = async (user, productId) => {
    const cart = await shopping_cart_model_1.default.findById(user.shoppingCart).populate('products.product', { price: 1, name: 1, onSale: 1, salePercentage: 1, salePrice: 1, images: 1 });
    const foundObject = cart?.products.find(product => productId === product.product.id.toString());
    let response;
    if (!foundObject) {
        response = ({
            status: 404,
            response: { Error: 'Item Not Found' }
        });
    }
    if (foundObject && cart) {
        if (cart.products.length < 1) {
            response = ({
                status: 400,
                response: { Error: 'Cart Is Empty' }
            });
        }
        if (foundObject.quantity > 1) {
            foundObject.quantity -= 1;
        }
        else {
            const index = cart.products.findIndex(product => productId === product.product.id.toString());
            cart.products.splice(index, 1);
        }
        cart.cartTotal -= 1;
        cart.cartPrice -= foundObject.product.onSale ?
            foundObject.product.salePrice
            :
                foundObject.product.price;
        cart.cartPrice = (0, rounding_1.default)(cart.cartPrice, 2);
        const savedCart = await cart.save();
        response = ({
            status: 200,
            response: savedCart
        });
    }
    return (response);
};
exports.reduceFromCartUser = reduceFromCartUser;
const reduceFromCartGuest = async (guestCart, productId, sessionId) => {
    const foundProduct = guestCart.products.find(product => productId === product.product.toString());
    const product = await product_model_1.default.findById(foundProduct?.product);
    const foundIndex = guestCart.products.findIndex(product => productId === product.product.toString());
    if (!foundProduct) {
        return ({
            status: 404,
            response: { Error: 'Item Not Found' }
        });
    }
    else {
        if (foundProduct.quantity > 1) {
            foundProduct.quantity -= 1;
        }
        else {
            guestCart.products.splice(foundIndex, 1);
        }
        guestCart.cartPrice -= product.onSale ?
            product.salePrice
            :
                product.price;
        guestCart.cartTotal -= 1;
        guestCart.cartPrice = (0, rounding_1.default)(guestCart.cartPrice, 2);
        const newSessionCart = await session_model_1.default.findByIdAndUpdate(sessionId, { 'session.guestCart': guestCart }, { new: true,
            runValidators: true,
            context: 'query' }).populate('session.guestCart.products.product', { stock: 0, sold: 0, reviews: 0, imageFolder: 0 });
        return ({
            status: 200,
            response: newSessionCart?.session.guestCart
        });
    }
};
exports.reduceFromCartGuest = reduceFromCartGuest;
