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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = void 0;
const authUtils_1 = require("../../adapters/auth/authUtils");
const userRepository_1 = require("../../adapters/repositories/userRepository");
const postLogin = ({ userName, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        user = yield (0, userRepository_1.findUserByEmail)(userName);
        if (!user.success) {
            user = yield (0, userRepository_1.findUserByUserName)(userName);
        }
        if (!user.success) {
            user = yield (0, userRepository_1.findUserByMobile)(userName);
        }
        if (!user.success || !user.user) {
            return ({
                status: false,
                message: "user not found"
            });
        }
        const passValidate = yield (0, authUtils_1.checkPassword)(password, user.user.password);
        if (passValidate) {
            return {
                success: true,
                user: user.user,
                message: 'user validated'
            };
        }
        else {
            return {
                success: false,
                message: 'incorrect password'
            };
        }
    }
    catch (error) {
        console.error('postlogin error', error.message);
        return {
            success: false,
            message: error.message
        };
    }
});
exports.postLogin = postLogin;
