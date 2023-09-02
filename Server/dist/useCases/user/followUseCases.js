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
exports.followUnfollowUser = void 0;
const followRepository_1 = require("../../adapters/repositories/followRepository");
const userRepository_1 = require("../../adapters/repositories/userRepository");
const followUnfollowUser = (userId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield (0, userRepository_1.findUserById)(userId);
        const follower = yield (0, userRepository_1.findUserById)(followerId);
        if (!user || !follower) {
            throw new Error('couldnt find the user or follower');
        }
        if (!((_a = user.following) === null || _a === void 0 ? void 0 : _a.includes(followerId))) {
            const updatedUser = yield (0, followRepository_1.follow)(userId, followerId);
            return {
                success: true,
                data: updatedUser,
                message: 'followed successfully'
            };
        }
        else {
            const updatedUser = yield (0, followRepository_1.unfollow)(userId, followerId);
            return {
                success: true,
                data: updatedUser,
                message: 'unfollowed successfully'
            };
        }
    }
    catch (error) {
        console.error(error.message);
        return {
            success: false,
            message: error.message
        };
    }
});
exports.followUnfollowUser = followUnfollowUser;
