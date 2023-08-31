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
const express_1 = require("express");
const userSignup_1 = require("../../useCases/user/userSignup");
const authUtils_1 = require("../../adapters/auth/authUtils");
const signupRouter = (0, express_1.Router)();
signupRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, mobile, userName, password } = req.body;
        const signupResult = yield (0, userSignup_1.userSignup)({ name, email, mobile, userName, password });
        if (signupResult === null || signupResult === void 0 ? void 0 : signupResult.success) {
            const jwtToken = yield (0, authUtils_1.generateJwtToken)(signupResult.user);
            res.cookie('jwtToken', jwtToken, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
            res.status(200).json({
                message: "User signed up successfully!",
                success: true
            });
        }
        else {
            res.status(200).json({
                message: signupResult === null || signupResult === void 0 ? void 0 : signupResult.message,
                success: false
            });
        }
    }
    catch (error) {
        console.error('error occured at signupRoute', error.message);
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}));
exports.default = signupRouter;
// use refresh token to regenerate token in short lifespan so that user dont need to login freequently and security
