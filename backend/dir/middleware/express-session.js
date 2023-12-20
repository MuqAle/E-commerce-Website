"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStore = exports.sessionOptions = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const config_1 = require("../config/config");
const sessionStore = connect_mongo_1.default.create({
    mongoUrl: config_1.MONGODB_URI,
    stringify: false,
    ttl: 14 * 24 * 60 * 60
});
exports.sessionStore = sessionStore;
const sessionOptions = {
    secret: config_1.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
};
exports.sessionOptions = sessionOptions;
