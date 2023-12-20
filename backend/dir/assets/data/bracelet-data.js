"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_bracelet_imgs_1 = __importDefault(require("../../utils/import-imgs/import-bracelet-imgs"));
const braceletData = [{
        name: 'Black Chakra Bead Bracelet',
        type: 'bracelet',
        price: 21.5,
        onSale: true,
        salePercentage: .8,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        stock: 50,
        metal: 'brass',
        colors: ['black', 'rainbow'],
        images: [import_bracelet_imgs_1.default.blackChakraImg1, import_bracelet_imgs_1.default.blackChakraImg2]
    },
    {
        name: 'Boho Bangle',
        type: 'bracelet',
        price: 32.6,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.bohoBangleImg1, import_bracelet_imgs_1.default.bohoBangleImg2]
    },
    {
        name: 'Buddha Bracelet',
        type: 'bracelet',
        price: 21.5,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.buddhaImg1, import_bracelet_imgs_1.default.buddhaImg2]
    },
    {
        name: 'Color Chakra Bead Bracelet',
        type: 'bracelet',
        price: 21.5,
        onSale: true,
        salePercentage: .8,
        stock: 50,
        metal: 'silver',
        colors: ['rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.colorChakraImg1, import_bracelet_imgs_1.default.colorChakraImg2]
    },
    {
        name: 'Embroidered Bangle',
        type: 'bracelet',
        price: 23,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.embroidImg1]
    },
    {
        name: 'Gold Arrow Bangle',
        type: 'bracelet',
        price: 27,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.goldArrowImg1]
    },
    {
        name: 'Jeweled Bangle',
        type: 'bracelet',
        price: 41,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.jewelsImg1]
    },
    {
        name: 'Moon Friendship Bracelet',
        type: 'bracelet',
        price: 28,
        onSale: true,
        salePercentage: .7,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.moonImg1]
    },
    {
        name: 'Anchor Charm Bracelet',
        type: 'bracelet',
        price: 27,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.nauticalCharmImg1, import_bracelet_imgs_1.default.nauticalCharmImg2]
    },
    {
        name: 'Navy Nautical Leather Bracelet',
        type: 'bracelet',
        price: 15,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['blue'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.navyAnchorImg1]
    },
    {
        name: 'Navy Chakra Bead Bracelet',
        type: 'bracelet',
        price: 21.5,
        onSale: true,
        salePercentage: .8,
        stock: 50,
        metal: 'brass',
        colors: ['blue', 'rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.navyChakraImg1, import_bracelet_imgs_1.default.navyChakraImg2]
    },
    {
        name: 'Patterned Bangle',
        type: 'bracelet',
        price: 23,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.patternBangleImg1]
    },
    {
        name: 'Purple Chakra Bead Bracelet',
        type: 'bracelet',
        price: 21.5,
        onSale: true,
        salePercentage: .8,
        stock: 50,
        metal: 'brass',
        colors: ['purple', 'rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.purpleChakraImg1, import_bracelet_imgs_1.default.purpleChakraImg2]
    },
    {
        name: 'Red Nautical Leather Bracelet',
        type: 'bracelet',
        price: 15,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['red'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.redAnchorImg1]
    },
    {
        name: 'Simple Gold Bangle',
        type: 'bracelet',
        price: 31,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.simpleGoldImg1]
    },
    {
        name: 'Stacked Arrow Bangles',
        type: 'bracelet',
        price: 37,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.stackedArrowImg1]
    },
    {
        name: 'Stacked Boho Bangle',
        type: 'bracelet',
        price: 35,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['rainbow'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.stackedTasselImg1]
    },
    {
        name: 'Sun Friendship Bracelet',
        type: 'bracelet',
        price: 28,
        onSale: true,
        salePercentage: .7,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_bracelet_imgs_1.default.sunImg1]
    }];
exports.default = braceletData;
