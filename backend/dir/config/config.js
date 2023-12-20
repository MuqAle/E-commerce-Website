"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.CLOUDINARY_NAME = exports.CLOUDINARY_KEY = exports.CLOUDINARY_SECRET = exports.STRIPE_WEBHOOK = exports.STRIPE_KEY = exports.SESSION_KEY = exports.SECRET = exports.PORT = exports.MONGODB_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
_a = process.env, exports.MONGODB_URI = _a.MONGODB_URI, exports.PORT = _a.PORT, exports.SECRET = _a.SECRET, exports.SESSION_KEY = _a.SESSION_KEY, exports.STRIPE_KEY = _a.STRIPE_KEY, exports.STRIPE_WEBHOOK = _a.STRIPE_WEBHOOK, exports.CLOUDINARY_SECRET = _a.CLOUDINARY_SECRET, exports.CLOUDINARY_KEY = _a.CLOUDINARY_KEY, exports.CLOUDINARY_NAME = _a.CLOUDINARY_NAME, exports.CLIENT_URL = _a.CLIENT_URL;
