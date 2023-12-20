"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const jwt_middleware_1 = require("./middleware/jwt-middleware");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const login_router_1 = __importDefault(require("./routes/login-router"));
const user_req_routes_1 = __importDefault(require("./routes/user-req-routes"));
const express_session_1 = __importDefault(require("express-session"));
const cart_routes_1 = __importDefault(require("./routes/cart-routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const checkout_routes_1 = __importDefault(require("./routes/checkout-routes"));
const express_session_2 = require("./middleware/express-session");
const order_routes_1 = __importDefault(require("./routes/order-routes"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', false);
const dbConnect = async () => {
    try {
        if (config_1.MONGODB_URI) {
            await mongoose_1.default.connect(config_1.MONGODB_URI);
            console.log('connected to db');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error, ${error.message}`);
        }
    }
};
dbConnect().catch(db => console.log(db.error));
app.use((0, cors_1.default)({
    origin: config_1.CLIENT_URL,
    credentials: true
}));
app.use(express_1.default.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf.toString();
    }
}));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(express_session_2.sessionOptions));
app.use(jwt_middleware_1.tokenExtractor);
app.use('/api/user-req', jwt_middleware_1.userExtractor, user_req_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/login', login_router_1.default);
app.use('/api/cart', jwt_middleware_1.userExtractor, cart_routes_1.default);
app.use('/api/checkout', jwt_middleware_1.userExtractor, checkout_routes_1.default);
app.use('/api/orders', jwt_middleware_1.userExtractor, order_routes_1.default);
app.use(error_handler_1.default);
exports.default = app;
