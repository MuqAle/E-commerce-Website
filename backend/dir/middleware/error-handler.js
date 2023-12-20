"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ Error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ Error: error.message });
    }
    return next(error);
};
exports.default = errorHandler;
