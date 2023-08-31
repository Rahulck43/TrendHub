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
exports.generateAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv");
const jwtKey = process.env.JWT_KEY || '';
const generateAdminToken = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield jsonwebtoken_1.default.sign({ email: admin.email }, jwtKey, {
            expiresIn: "2d",
        });
        if (token) {
            return token;
        }
        else
            return false;
    }
    catch (error) {
        throw new Error('error while generating token');
    }
});
exports.generateAdminToken = generateAdminToken;
