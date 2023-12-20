"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wishlist_service_1 = require("../services/wishlist-service");
const addWishList = async (req, res) => {
    const prodId = req.params.id;
    const user = req.user;
    const id = user.id;
    try {
        const alreadyAdded = user.wishList?.find(id => id._id.toString() === prodId);
        if (alreadyAdded) {
            const user = await (0, wishlist_service_1.removeFromWishlist)(id, prodId);
            res.json(user);
        }
        else {
            const user = await (0, wishlist_service_1.addToWishlist)(id, prodId);
            res.json(user);
        }
    }
    catch (error) {
        res.status(500).json({
            Error: 'An Error Has Occurred'
        });
    }
};
exports.default = addWishList;
