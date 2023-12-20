"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
// const path =  __dirname.replace('/config','')
const uuid = (0, uuid_1.v4)();
const storage = multer_1.default.diskStorage({
    filename: (_req, _file, cb) => {
        cb(null, new Date().toISOString() + uuid);
    }
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
        const err = new Error('Only jpeg, png, or jpeg format allowed');
        return cb(err);
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
exports.default = upload;
