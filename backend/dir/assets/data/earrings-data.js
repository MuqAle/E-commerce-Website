"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_earrings_imgs_1 = __importDefault(require("../../utils/import-imgs/import-earrings-imgs"));
const earringData = [{
        name: 'Boho Earrings',
        type: 'earrings',
        price: 23,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['blue'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.bohoImg]
    },
    {
        name: 'Elephant Studs',
        type: 'earrings',
        price: 24,
        onSale: true,
        salePercentage: .6,
        stock: 50,
        metal: 'gold',
        colors: ['black', 'white'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.elephantImg]
    },
    {
        name: 'Galaxy Earrings',
        type: 'earrings',
        price: 17,
        onSale: true,
        salePercentage: .8,
        stock: 50,
        metal: 'silver',
        colors: ['blue', 'purple', 'black'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.galaxyImg]
    },
    {
        name: 'Angel Studs',
        type: 'earrings',
        price: 25,
        onSale: false,
        stock: 50,
        metal: 'silver',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.angelImg]
    },
    {
        name: 'Gold Hoops',
        type: 'earrings',
        price: 31,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.smallHoopsImg]
    },
    {
        name: 'Tear Drop Earrings',
        type: 'earrings',
        price: 28,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.tearDropImg]
    },
    {
        name: 'Pearls Dangle Earrings',
        type: 'earrings',
        price: 33,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: ['white'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.pearlImg]
    },
    {
        name: 'Marble Studs',
        type: 'earrings',
        price: 15,
        onSale: false,
        stock: 50,
        metal: 'silver',
        colors: ['white', 'blue'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.marbleStudImg]
    },
    {
        name: 'Gold Beaded Drop Earrings',
        type: 'earrings',
        price: 28,
        onSale: false,
        stock: 50,
        metal: 'gold',
        colors: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        images: [import_earrings_imgs_1.default.goldImg]
    }];
exports.default = earringData;
