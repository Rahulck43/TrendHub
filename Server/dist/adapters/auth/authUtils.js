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
exports.checkPassword = exports.generateJwtToken = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv");
const jwtKey = process.env.JWT_KEY || '';
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPass = yield bcrypt_1.default.hash(password, 10);
    return hashedPass;
});
exports.hashPassword = hashPassword;
const generateJwtToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ user_id: user._id, email: user.email }, jwtKey, {
        expiresIn: "2d",
    });
    return token;
};
exports.generateJwtToken = generateJwtToken;
const checkPassword = (password, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = yield bcrypt_1.default.compare(password, dbPassword);
        if (isValid) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new Error('error while comparing password');
    }
});
exports.checkPassword = checkPassword;
