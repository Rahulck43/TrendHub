"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUrl = process.env.MONGOOSE_URL || '';
const dbConnection = () => {
    mongoose_1.default.connect(mongoUrl, {}).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((err) => {
        console.error('Mongoose connection error:', err);
    });
};
exports.default = dbConnection;
