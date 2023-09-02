"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeUser = void 0;
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
const decodeUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, jwtKey);
        const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.user_id;
        return userId;
    }
    catch (error) {
        throw error(error);
    }
});
exports.decodeUser = decodeUser;
exports.default = userAuth;
