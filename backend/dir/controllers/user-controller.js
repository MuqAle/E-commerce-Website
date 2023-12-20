"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserProfile = exports.changeUserPassword = exports.getUserProfile = exports.deleteUser = exports.getUsers = exports.addUser = void 0;
const bcrypt_1 = require("bcrypt");
const user_model_1 = __importDefault(require("../models/user-model"));
const user_service_1 = require("../services/user-service");
const addUser = async (req, res, next) => {
    const { email, firstName, lastName, password, isAdmin } = req.body;
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/);
    try {
        if (!password) {
            return res.status(400).json({
                Error: 'Content Missing'
            });
        }
        if (password.length <= 3) {
            return res.status(400).json({
                Error: 'Password Too short'
            });
        }
        if (!regexp.test(password)) {
            return res.status(400).json({
                Error: 'Password Must Include a Capital Letter, a Number, And a Special Character'
            });
        }
        const saltRounds = 10;
        const passwordHash = await (0, bcrypt_1.hash)(password, saltRounds);
        const user = await (0, user_service_1.createUser)(email, firstName, lastName, passwordHash, isAdmin);
        return res.status(201).json(user);
    }
    catch (error) {
        return next(error);
    }
};
exports.addUser = addUser;
const getUsers = async (_req, res) => {
    const users = await user_model_1.default.find({}).populate('reviews.product', {
        name: 1, type: 1, overallRating: 1
    });
    res.json(users);
};
exports.getUsers = getUsers;
const deleteUser = async (req, res) => {
    const userId = req.user.id;
    const cartId = req.user.shoppingCart;
    try {
        await (0, user_service_1.deleteUserDB)(userId, cartId);
        res.status(204).end();
    }
    catch (error) {
        res.status(404).json({ Error: 'User Not Found' });
    }
};
exports.deleteUser = deleteUser;
const getUserProfile = (req, res) => {
    if (req.user) {
        res.status(201).json(req.user);
    }
    else {
        res.status(401).json({ Error: 'User Not Logged In' });
    }
};
exports.getUserProfile = getUserProfile;
const changeUserProfile = async (req, res, next) => {
    const body = req.body;
    if (req.user) {
        const user = {
            firstName: body.firstName,
            lastName: body.lastName,
        };
        try {
            const passwordCorrect = await (0, bcrypt_1.compare)(body.currentPassword, req.user.passwordHash);
            if (!passwordCorrect) {
                return res.status(401).json({ Error: 'Invalid Password' });
            }
            else {
                const newUserInfo = await user_model_1.default.findByIdAndUpdate(req.user.id, user, { new: true,
                    runValidators: true,
                    context: 'query' });
                return res.status(200).json(newUserInfo);
            }
        }
        catch (error) {
            return next(error);
        }
    }
    else {
        return res.status(404).json({ Error: 'No User Found' });
    }
};
exports.changeUserProfile = changeUserProfile;
const changeUserPassword = async (req, res, next) => {
    const { newPassword, currentPassword, rewriteNewPassword } = req.body;
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/);
    if (req.user) {
        try {
            const passwordCorrect = await (0, bcrypt_1.compare)(currentPassword, req.user.passwordHash);
            if (!passwordCorrect) {
                return res.status(401).json({ Error: 'Invalid Password' });
            }
            if (!newPassword) {
                return res.status(400).json({
                    Error: 'Content Missing'
                });
            }
            else if (newPassword.length <= 3) {
                return res.status(400).json({
                    Error: 'Password Too short'
                });
            }
            else if (!regexp.test(newPassword)) {
                return res.status(400).json({
                    Error: 'Password Must Include a Capital Letter, a Number, And a Special Character'
                });
            }
            else if (newPassword !== rewriteNewPassword) {
                return res.status(400).json({
                    Error: "Password Doesn't Match"
                });
            }
            else {
                const saltRounds = 10;
                const passwordHash = await (0, bcrypt_1.hash)(newPassword, saltRounds);
                const newUserInfo = await user_model_1.default.findByIdAndUpdate(req.user.id, { passwordHash }, { new: true,
                    runValidators: true,
                    context: 'query' });
                return res.status(204).json(newUserInfo);
            }
        }
        catch (error) {
            return next(error);
        }
    }
};
exports.changeUserPassword = changeUserPassword;
