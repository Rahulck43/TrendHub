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
const userRepository_1 = require("../../../adapters/repositories/userRepository");
const profileRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { userData, userPosts } = yield (0, userRepository_1.getUserData)(userId);
        if (userData) {
            res.status(200).json({
                success: true,
                message: 'user data retrieved successfully',
                userData, userPosts
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'error finding user data',
                userData
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: 'unexpected error'
        });
    }
});
exports.default = profileRouter;
