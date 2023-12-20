"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductInventory = exports.clearCart = exports.createOrder = exports.checkoutSessionConfig = exports.createCustomer = exports.createLineItems = void 0;
const product_model_1 = __importDefault(require("../models/product-model"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("../config/config");
const orders_model_1 = __importDefault(require("../models/orders-model"));
const rounding_1 = __importDefault(require("../utils/rounding"));
const shopping_cart_model_1 = __importDefault(require("../models/shopping-cart-model"));
const session_model_1 = __importDefault(require("../models/session-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const stripe = new stripe_1.default(config_1.STRIPE_KEY, {
    apiVersion: '2023-08-16',
});
const createPriceData = async (productId, quantity) => {
    const product = await product_model_1.default.findById(productId);
    if (product) {
        if (product.stock === 0) {
            return NaN;
        }
        else {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: product.images,
                        metadata: {
                            item: productId.toString()
                        }
                    },
                    unit_amount: product.onSale ?
                        product.salePrice && (0, rounding_1.default)((product.salePrice * 100), 0) :
                        (0, rounding_1.default)(product.price * 100, 0)
                },
                quantity: quantity,
            };
        }
    }
    else {
        return;
    }
};
const createLineItems = async (array) => {
    const lineItems = await Promise.all(array.map(async (item) => {
        return await createPriceData(item.product, item.quantity);
    }));
    return lineItems;
};
exports.createLineItems = createLineItems;
const createCustomer = (user) => {
    return ({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        metadata: {
            userId: user.id.toString(),
        },
    });
};
exports.createCustomer = createCustomer;
const checkoutSessionConfig = (user, sessionID, customer, cartItems) => {
    return ({ line_items: cartItems,
        client_reference_id: user ? user.shoppingCart.toString() : sessionID,
        customer: user ? customer : undefined,
        automatic_tax: {
            enabled: true
        },
        customer_update: {
            shipping: user ? 'auto' : undefined
        },
        shipping_address_collection: {
            allowed_countries: ['US']
        },
        mode: 'payment',
        success_url: `${config_1.CLIENT_URL}/order-success`,
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 500,
                        currency: "usd",
                    },
                    display_name: "Standard shipping",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "usd",
                    },
                    display_name: "Next day air",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    },
                },
            }
        ]
    });
};
exports.checkoutSessionConfig = checkoutSessionConfig;
const updateProductInventory = async (products) => {
    for (const product of products) {
        const foundProduct = await product_model_1.default.findById(product.product);
        if (foundProduct) {
            foundProduct.stock -= product.quantity;
            foundProduct.sold += product.quantity;
            await foundProduct.save();
        }
    }
};
exports.updateProductInventory = updateProductInventory;
const createOrder = async (data, customer) => {
    const checkoutSession = await stripe.checkout.sessions.listLineItems(data.id, {
        expand: ['data.price.product']
    });
    const paymentIntent = await stripe.paymentIntents.retrieve(data.payment_intent, {
        expand: ['payment_method']
    });
    const shippingType = await stripe.shippingRates.retrieve(data.shipping_cost?.shipping_rate);
    const paymentMethod = paymentIntent.payment_method;
    const Items = checkoutSession.data;
    const products = Items.map((item) => {
        const product = item.price?.product;
        let metadata;
        if (product && typeof product !== 'string' && 'metadata' in product) {
            metadata = product.metadata.item;
        }
        return {
            product: metadata,
            quantity: item.quantity,
            price: item.price?.unit_amount / 100
        };
    });
    const newOrder = new orders_model_1.default({
        products: products,
        name: data.customer_details?.name,
        email: data.customer_details?.email,
        shippingName: data.shipping_details?.name,
        shippingAddress: data.customer_details?.address,
        userId: data.customer ? customer?.metadata.userId : 'Guest User',
        paymentIntentId: data.payment_intent,
        billingDetails: paymentMethod.billing_details,
        paymentType: paymentMethod.type,
        cardInfo: {
            brand: paymentMethod.card?.brand,
            last4: paymentMethod.card?.last4,
        },
        shippingCost: data.shipping_cost?.amount_subtotal / 100,
        shippingMethod: shippingType.display_name,
        tax: data.total_details?.amount_tax / 100,
        subtotal: data.amount_subtotal / 100,
        total: data.amount_total / 100
    });
    try {
        if (customer) {
            const user = await user_model_1.default.findById(customer.metadata.userId);
            user?.orders?.unshift(newOrder._id);
            await user?.save();
        }
        await newOrder.save();
        await updateProductInventory(products);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createOrder = createOrder;
const clearCart = async (session) => {
    if (session.customer) {
        const userCart = await shopping_cart_model_1.default.findById(session.client_reference_id);
        if (userCart) {
            userCart.products = [];
            userCart.cartPrice = 0;
            userCart.cartTotal = 0;
            await userCart.save();
        }
    }
    else {
        const guestCart = await session_model_1.default.findById(session.client_reference_id);
        if (guestCart) {
            guestCart.session.guestCart.products = [];
            guestCart.session.guestCart.cartPrice = 0;
            guestCart.session.guestCart.cartTotal = 0;
            await guestCart.save();
        }
    }
};
exports.clearCart = clearCart;
