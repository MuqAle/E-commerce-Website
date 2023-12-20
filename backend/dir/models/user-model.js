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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail_1.default, 'invalid email'],
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    wishList: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        }],
    shoppingCart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    reviews: [{
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product'
            },
            reviewTitle: String,
            reviewDesc: String,
            datePosted: {
                type: Date,
                default: Date.now()
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            }
        }],
    orders: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Order'
        }],
    stripeId: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
userSchema.plugin(mongoose_unique_validator_1.default);
const User = mongoose_1.default.model('User', userSchema);
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
exports.default = User;
