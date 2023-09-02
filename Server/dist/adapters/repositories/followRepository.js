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
exports.getSuggestedUsersList = exports.unfollow = exports.follow = void 0;
const userModel_1 = __importDefault(require("../../entities/userModel"));
const follow = (userId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follower = yield userModel_1.default.findById(followerId);
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { $push: { following: follower === null || follower === void 0 ? void 0 : follower._id } }, { new: true });
        if (updatedUser) {
            yield userModel_1.default.findByIdAndUpdate(followerId, { $push: { followers: userId } }, { new: true });
            return updatedUser;
        }
        else {
            throw new Error('error while following');
        }
    }
    catch (error) {
        console.error(error.message);
        throw new Error('unexpected error while following');
    }
});
exports.follow = follow;
const unfollow = (userId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follower = yield userModel_1.default.findById(followerId);
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { $pull: { following: follower === null || follower === void 0 ? void 0 : follower._id } }, { new: true });
        if (updatedUser) {
            yield userModel_1.default.findByIdAndUpdate(followerId, { $pull: { followers: userId } }, { new: true });
            return updatedUser;
        }
        else {
            throw new Error('error while unfollowing');
        }
    }
    catch (error) {
        console.error(error.mesasge);
        throw new Error('unexpected error while unfollowing');
    }
});
exports.unfollow = unfollow;
const getSuggestedUsersList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suggestions = yield userModel_1.default.find({
            _id: { $ne: userId },
            followers: { $nin: [userId] }
        });
        if (suggestions) {
            console.log(suggestions.length);
            return suggestions;
        }
        else
            throw new Error('error finding suggestions');
    }
    catch (error) {
        throw error(error);
    }
});
exports.getSuggestedUsersList = getSuggestedUsersList;
