"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.checkoutSession = void 0;
const config_1 = require("../config/config");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(config_1.STRIPE_KEY, {
    apiVersion: '2023-08-16',
});
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const stripe_service_1 = require("../services/stripe-service");
const checkoutSession = async (req, res) => {
    const guestCart = req.session.guestCart;
    const { user } = req;
    let cartItems = [];
    let customer;
    if (user) {
        const cart = await shopping_cart_model_1.default.findById(user.shoppingCart);
        if (!user.stripeId) {
            customer = await stripe.customers.create((0, stripe_service_1.createCustomer)(user));
            user.stripeId = customer.id;
            await user.save();
        }
        else {
            customer = await stripe.customers.retrieve(user.stripeId);
        }
        const userCart = cart?.products;
        if (userCart) {
            cartItems = await (0, stripe_service_1.createLineItems)(userCart);
        }
    }
    else {
        if (!guestCart) {
            return res.status(400).send('No Items In Cart');
        }
        else {
            cartItems = await (0, stripe_service_1.createLineItems)(guestCart.products);
            customer = undefined;
        }
    }
    if (cartItems.length === 0) {
        return res.status(400).send('No Items In Cart');
    }
    if (cartItems.includes(NaN)) {
        return res.status(400).send('Item In Cart Is Out Of Stock');
    }
    else {
        const session = await stripe.checkout.sessions.create((0, stripe_service_1.checkoutSessionConfig)(user, req.session.id, customer?.id, cartItems));
        return res.json(session.url);
    }
};
exports.checkoutSession = checkoutSession;
const stripeWebhook = async (req, res, _next) => {
    const webhookSecret = config_1.STRIPE_WEBHOOK;
    const body = req.rawBody;
    if (!webhookSecret) {
        return res.status(400).send('Webhook secret is not configured.');
    }
    let event;
    const sig = req.headers['stripe-signature'];
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    }
    catch (error) {
        if (error instanceof stripe_1.default.errors.StripeSignatureVerificationError) {
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }
        else {
            return res.status(500).send('Internal server error');
        }
    }
    const data = event.data.object;
    const eventType = event.type;
    if (eventType === "checkout.session.completed") {
        let customer;
        if (data.customer) {
            customer = await stripe.customers.retrieve(data.customer);
        }
        try {
            await (0, stripe_service_1.createOrder)(data, customer);
            await (0, stripe_service_1.clearCart)(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return res.status(200).end();
};
exports.stripeWebhook = stripeWebhook;
