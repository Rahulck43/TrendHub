"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv");
const jwtKey = process.env.JWT_KEY || '';
const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (token) {
            jsonwebtoken_1.default.verify(token, jwtKey, (err, decode) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'token verification failed'
                    });
                }
                else {
                    next();
                }
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: 'token not found'
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'unexpected error'
        });
    }
};
exports.default = userAuth;
