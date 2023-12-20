"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_necklace_imgs_1 = __importDefault(require("../../utils/import-imgs/import-necklace-imgs"));
const necklaceData = [{
        name: 'Birdie Necklace',
        type: 'necklace',
        price: 36.50,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.birdImg1]
    },
    {
        name: 'Floral Lace Choker',
        type: 'necklace',
        price: 30,
        onSale: true,
        salePercentage: .7,
        stock: 50,
        metal: 'gold',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.blackFloralImg1, import_necklace_imgs_1.default.blackFloralImg2]
    },
    {
        name: 'Black Lace Choker',
        type: 'necklace',
        price: 14.75,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.blackLaceImg1]
    },
    {
        name: 'Black Leather Choker',
        type: 'necklace',
        price: 18,
        onSale: true,
        salePercentage: .85,
        stock: 50,
        metal: 'gold',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.blackLeatherImg1, import_necklace_imgs_1.default.blackLeatherImg2]
    },
    {
        name: 'Gold Blue Beaded Necklace',
        type: 'necklace',
        price: 21,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['blue'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.blueBeadImg1]
    },
    {
        name: 'Blue Gem Necklace',
        type: 'necklace',
        price: 23,
        onSale: false,
        stock: 50,
        metal: 'silver',
        colors: ['blue'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.blueGemImg1, import_necklace_imgs_1.default.blueGemImg2]
    },
    {
        name: 'Paper Crane Necklace',
        type: 'necklace',
        price: 35,
        onSale: true,
        salePercentage: .5,
        stock: 50,
        metal: 'silver',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.craneImg1, import_necklace_imgs_1.default.craneImg2]
    },
    {
        name: 'Layered Gold Necklace',
        type: 'necklace',
        price: 30,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.daintyImg1]
    },
    {
        name: 'Ring Gold Chain',
        type: 'necklace',
        price: 27,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.delicateImg1]
    },
    {
        name: 'Gold Bead Black Choker',
        type: 'necklace',
        price: 14.65,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.goldBeadImg1, import_necklace_imgs_1.default.goldBeadImg2]
    },
    {
        name: 'Gold Pendent Choker',
        type: 'necklace',
        price: 28.5,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.pegImg1]
    },
    {
        name: 'Purple Gem Necklace',
        type: 'necklace',
        price: 23,
        onSale: false,
        stock: 50,
        metal: 'silver',
        colors: ['purple'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.purpleGemImg1]
    },
    {
        name: 'Silver Pendent Chain',
        type: 'necklace',
        price: 34,
        onSale: true,
        salePercentage: .8,
        stock: 50,
        metal: 'silver',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.silverThreadImg1]
    },
    {
        name: 'Tree of Life Necklace',
        type: 'necklace',
        price: 25,
        onSale: true,
        salePercentage: .85,
        stock: 50,
        metal: 'silver',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.treeImg1]
    },
    {
        name: 'Triangle Pendent Choker',
        type: 'necklace',
        price: 21,
        onSale: false,
        stock: 50,
        metal: 'silver',
        colors: ['black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.triangleImg1, import_necklace_imgs_1.default.triangleImg2]
    },
    {
        name: 'White Lace Choker',
        type: 'necklace',
        price: 14.75,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['white'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_necklace_imgs_1.default.whiteLaceImg1, import_necklace_imgs_1.default.whiteLaceImg2]
    }];
exports.default = necklaceData;
