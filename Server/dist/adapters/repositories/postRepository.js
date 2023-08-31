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
exports.updateComment = exports.deleteComment = exports.likeComment = exports.addComment = exports.unLike = exports.like = exports.deleteById = exports.updatePost = exports.findById = exports.savePost = void 0;
const mongoose_1 = require("mongoose");
const postModel_1 = __importDefault(require("../../entities/postModel"));
const savePost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = new postModel_1.default(post);
        const savedPost = yield newPost.save();
        if (savedPost) {
            return savedPost;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error.message);
        throw new mongoose_1.Error('unexpected error while creating post');
    }
});
exports.savePost = savePost;
const findById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.findById(postId).populate("comments.userId");
        if (post)
            return post;
        else
            return false;
    }
    catch (error) {
        throw new mongoose_1.Error('unexpected error while finding post');
    }
});
exports.findById = findById;
const updatePost = (postId, caption) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(postId, { caption }, { new: true });
        if (updatedPost) {
            return updatedPost;
        }
        else {
            throw new mongoose_1.Error('error while updating post');
        }
    }
    catch (error) {
        console.error(error.message);
        throw new mongoose_1.Error('unexpected error while updating post');
    }
});
exports.updatePost = updatePost;
const deleteById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postModel_1.default.findByIdAndDelete(postId);
        if (result) {
            return true;
        }
        else {
            throw new mongoose_1.Error('error while updating post');
        }
    }
    catch (error) {
        console.error(error.message);
        throw new mongoose_1.Error('unexpected error while deleting post');
    }
});
exports.deleteById = deleteById;
const like = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
        if (updatedPost) {
            return updatedPost;
        }
        else {
            throw new mongoose_1.Error('error while updating like');
        }
    }
    catch (error) {
        console.error(error.message);
        throw new mongoose_1.Error('unexpected error while updating likes');
    }
});
exports.like = like;
const unLike = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
        if (updatedPost) {
            return updatedPost;
        }
        else {
            throw new mongoose_1.Error('error while updating like');
        }
    }
    catch (error) {
        console.error(error.mesasge);
        throw new mongoose_1.Error('unexpected error while updating likes');
    }
});
exports.unLike = unLike;
const addComment = (userId, postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postModel_1.default
            .findByIdAndUpdate(postId, {
            $push: { comments: { userId, comment } }
        }, { new: true })
            .populate("comments.userId");
        if (result) {
            return { data: result, success: true };
        }
        else {
            throw new mongoose_1.Error('Error while adding comment');
        }
    }
    catch (error) {
        console.error(error.message);
        throw new mongoose_1.Error('Unexpected error while adding comment');
    }
});
exports.addComment = addComment;
const likeComment = (postId, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const existingPost = yield postModel_1.default.findById(postId);
        if (!existingPost) {
            throw new mongoose_1.Error("Post not found");
        }
        if (!existingPost.comments) {
            throw new mongoose_1.Error("No comments found");
        }
        const commentArray = existingPost.comments;
        const commentIndex = commentArray.findIndex((comment) => { var _a; return ((_a = comment === null || comment === void 0 ? void 0 : comment._id) === null || _a === void 0 ? void 0 : _a.toString()) === commentId; });
        if (commentIndex === -1) {
            throw new mongoose_1.Error("Comment not found");
        }
        const specificComment = commentArray[commentIndex];
        const likedByUser = (_a = specificComment.likes) === null || _a === void 0 ? void 0 : _a.includes(userId);
        if (likedByUser) {
            specificComment.likes = (_b = specificComment.likes) === null || _b === void 0 ? void 0 : _b.filter(likeUserId => likeUserId !== userId);
        }
        else {
            specificComment.likes = [...(specificComment.likes || []), userId];
        }
        existingPost.comments[commentIndex] = specificComment;
        yield existingPost.save();
        return existingPost;
    }
    catch (error) {
        throw error;
    }
});
exports.likeComment = likeComment;
const deleteComment = (postId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingPost = yield postModel_1.default.findById(postId);
        if (!existingPost) {
            throw new mongoose_1.Error("Post not found");
        }
        if (!existingPost.comments) {
            throw new mongoose_1.Error("No comments found");
        }
        const commentArray = existingPost.comments;
        const commentIndex = commentArray.findIndex((comment) => { var _a; return ((_a = comment === null || comment === void 0 ? void 0 : comment._id) === null || _a === void 0 ? void 0 : _a.toString()) === commentId; });
        if (commentIndex === -1) {
            throw new mongoose_1.Error("Comment not found");
        }
        commentArray.splice(commentIndex, 1);
        yield existingPost.save();
        return existingPost;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteComment = deleteComment;
const updateComment = (postId, commentId, editedComment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingPost = yield postModel_1.default.findById(postId);
        if (!existingPost) {
            throw new mongoose_1.Error("Post not found");
        }
        if (!existingPost.comments) {
            throw new mongoose_1.Error("No comments found");
        }
        const commentArray = existingPost.comments;
        const commentIndex = commentArray.findIndex((comment) => { var _a; return ((_a = comment === null || comment === void 0 ? void 0 : comment._id) === null || _a === void 0 ? void 0 : _a.toString()) === commentId; });
        if (commentIndex === -1) {
            throw new mongoose_1.Error("Comment not found");
        }
        commentArray[commentIndex].comment = editedComment;
        yield existingPost.save();
        return existingPost;
    }
    catch (error) {
        throw error;
    }
});
exports.updateComment = updateComment;
