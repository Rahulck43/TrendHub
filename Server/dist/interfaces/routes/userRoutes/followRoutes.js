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
exports.getSuggestions = exports.followUnfollow = void 0;
const userAuth_1 = require("../../../adapters/middlewares/userAuth");
const followUseCases_1 = require("../../../useCases/user/followUseCases");
const followRepository_1 = require("../../../adapters/repositories/followRepository");
const followUnfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwtToken;
        const userId = yield (0, userAuth_1.decodeUser)(token);
        const followerId = req.params.id;
        const result = yield (0, followUseCases_1.followUnfollowUser)(userId, followerId);
        if (result === null || result === void 0 ? void 0 : result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        else {
            console.error(result.message);
            throw Error(result.message);
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.followUnfollow = followUnfollow;
const getSuggestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwtToken;
        const userId = yield (0, userAuth_1.decodeUser)(token);
        const suggestedUsers = yield (0, followRepository_1.getSuggestedUsersList)(userId);
    }
    catch (error) {
    }
});
exports.getSuggestions = getSuggestions;
