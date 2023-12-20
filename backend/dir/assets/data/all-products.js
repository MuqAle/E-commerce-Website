"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bracelet_data_1 = __importDefault(require("./bracelet-data"));
const earrings_data_1 = __importDefault(require("./earrings-data"));
const necklace_data_1 = __importDefault(require("./necklace-data"));
const allData = [...bracelet_data_1.default, ...earrings_data_1.default, ...necklace_data_1.default];
exports.default = allData;
