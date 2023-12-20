"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const inventorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    price: {
        type: Number,
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    },
    salePercentage: {
        type: Number,
        validate: {
            validator: function (value) {
                if (this.onSale === true) {
                    return typeof value === 'number';
                }
                return true;
            },
            message: 'Sale percentage is required when the product is on sale.',
        },
    },
    salePrice: {
        type: Number,
    },
    description: String,
    stock: {
        type: Number,
        required: [true, 'Must know how many in stock']
    },
    sold: {
        type: Number,
        default: 0
    },
    metal: {
        type: String,
        enum: ['gold', 'silver', 'brass']
    },
    colors: [String],
    overallRating: {
        type: Number,
        default: 0
    },
    reviews: [{
            postedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User'
            },
            reviewDesc: {
                type: String,
                required: true,
                minLength: 10
            },
            rating: Number,
            reviewTitle: {
                type: String,
                maxLength: 50
            },
            datePosted: {
                type: Date,
                default: new Date().toUTCString()
            }
        }],
    images: [{
            type: String,
            required: [true, 'an image must be uploaded']
        }],
    imageFolder: String
}, {
    timestamps: true
});
const Product = mongoose_1.default.model('Product', inventorySchema);
inventorySchema.set('toJSON', {
    transform: (_document, returnObject) => {
        delete returnObject.__v;
    }
});
exports.default = Product;
