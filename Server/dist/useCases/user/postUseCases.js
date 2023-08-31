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
exports.likePost = void 0;
const postRepository_1 = require("../../adapters/repositories/postRepository");
const likePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const post = yield (0, postRepository_1.findById)(postId);
        if (!post) {
            throw new Error('couldnt find the post');
        }
        if (!((_a = post.likes) === null || _a === void 0 ? void 0 : _a.includes(userId))) {
            const updatedPost = yield (0, postRepository_1.like)(postId, userId);
            return {
                success: true,
                data: updatedPost,
                message: 'post has been liked'
            };
        }
        else {
            const updatedPost = yield (0, postRepository_1.unLike)(postId, userId);
            return {
                success: true,
                data: updatedPost,
                message: 'post has been unliked'
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
exports.likePost = likePost;
