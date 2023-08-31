"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongooseConfig_1 = __importDefault(require("./adapters/mongooseConfig"));
const userRoutes_1 = __importDefault(require("./interfaces/routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./interfaces/routes/adminRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use('/', userRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
app.listen(4000, () => {
    console.log('server listening on 4000');
});
(0, mongooseConfig_1.default)();
