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
exports.userSignup = void 0;
const userRepository_1 = require("../../adapters/repositories/userRepository");
const authUtils_1 = require("../../adapters/auth/authUtils");
function userSignup({ name, email, mobile, userName, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userExist = yield (0, userRepository_1.findUser)(email, mobile, userName);
            if (userExist) {
                return ({
                    success: false,
                    message: `${userExist.field} already exist`,
                });
            }
            else if (userExist === null) {
                const hashedPass = yield (0, authUtils_1.hashPassword)(password);
                const newUser = yield (0, userRepository_1.saveUser)({ name, email, mobile, userName, hashedPass });
                return {
                    success: true,
                    user: newUser,
                    message: 'user saved successfully'
                };
            }
        }
        catch (error) {
            console.error('Error occurred during user signup:', error.message);
            return {
                success: false,
                message: 'unexpected error at userSignup'
            };
        }
    });
}
exports.userSignup = userSignup;
