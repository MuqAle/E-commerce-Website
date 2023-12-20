"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    products: [{
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shippingName: {
        type: String,
        required: true
    },
    shippingAddress: {
        line1: String,
        line2: String,
        postal_code: String,
        city: String,
        state: String,
        country: String
    },
    userId: {
        type: String || mongoose_1.Schema.Types.ObjectId,
        default: 'Guest User',
        ref: 'User'
    },
    paymentIntentId: String,
    paymentType: String,
    billingDetails: {
        address: {
            line1: String,
            line2: String,
            postal_code: String,
            city: String,
            state: String,
            country: String
        },
        email: String,
        name: String
    },
    cardInfo: {
        brand: String,
        last4: String
    },
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            'Not Processed',
            'Processing',
            'Label Created',
            'Shipped',
            'Delivered',
            'Canceled'
        ]
    },
    shippingCost: Number,
    shippingMethod: String,
    tax: Number,
    subtotal: Number,
    total: Number,
}, {
    timestamps: true
});
const Order = mongoose_1.default.model('Order', orderSchema);
orderSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = Order;
