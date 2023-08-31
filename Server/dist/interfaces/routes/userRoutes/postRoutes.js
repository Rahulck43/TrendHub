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
exports.postReport = exports.putEditComment = exports.deleteCommentRoute = exports.putCommentLike = exports.postComment = exports.getPost = exports.updateLike = exports.deletePost = exports.editPost = exports.createPost = void 0;
const postRepository_1 = require("../../../adapters/repositories/postRepository");
const cloudinaryUpload_1 = __importDefault(require("../../../adapters/middlewares/cloudinaryUpload"));
const postUseCases_1 = require("../../../useCases/user/postUseCases");
const reportPostRepository_1 = require("../../../adapters/repositories/reportPostRepository");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = req.body;
        const file = req.file;
        if (!newPost || !file) {
            throw new Error('Post details not found');
        }
        if (file) {
            const secure_url = yield (0, cloudinaryUpload_1.default)(file);
            newPost.img = secure_url;
        }
        const savedPost = yield (0, postRepository_1.savePost)(newPost);
        if (savedPost) {
            res.status(200).json({
                success: true,
                message: 'post saved successfullly',
                data: savedPost
            });
        }
        else {
            throw new Error('error while saving post');
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.createPost = createPost;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const postId = req.params.id;
        const { editedPost, userId } = req.body;
        if (!postId || !userId) {
            throw new Error('Post or user details not found');
        }
        const post = yield (0, postRepository_1.findById)(postId);
        if (post && ((_b = ((_a = post.userId) !== null && _a !== void 0 ? _a : null)) === null || _b === void 0 ? void 0 : _b.equals(userId))) {
            const updatedPost = yield (0, postRepository_1.updatePost)(postId, editedPost);
            res.status(200).json({
                success: true,
                message: 'Post updated successfully',
                data: updatedPost
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Unauthorized to edit this post'
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.editPost = editPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const postId = req.params.id;
        const userId = req.query.userId;
        if (!postId || !userId) {
            throw new Error('Post or user details not found');
        }
        const post = yield (0, postRepository_1.findById)(postId);
        if (post && (((_c = post.userId) === null || _c === void 0 ? void 0 : _c.toString()) === userId)) {
            const result = yield (0, postRepository_1.deleteById)(postId);
            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Post deleted successfully',
                });
            }
            else {
                throw new Error('error while deleting post');
            }
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this post'
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.deletePost = deletePost;
const postReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, reason } = req.body;
        const postId = req.params.id;
        if (!postId || !userId) {
            res.status(400).json({
                success: false,
                message: 'details not found'
            });
        }
        const result = yield (0, reportPostRepository_1.reportPost)(userId, reason, postId);
        if (result) {
            res.status(200).json({
                success: true,
                message: result.message,
            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.postReport = postReport;
const updateLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const { userId } = req.body;
        const result = yield (0, postUseCases_1.likePost)(postId, userId);
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
exports.updateLike = updateLike;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const result = yield (0, postRepository_1.findById)(postId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'post data fetched successfully',
                data: result
            });
        }
        else {
            throw Error('unable to get post details');
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.getPost = getPost;
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, comment } = req.body;
        const postId = req.params.id;
        if (!userId || !comment || !postId) {
            throw new Error('data missing to add comment');
        }
        const result = yield (0, postRepository_1.addComment)(userId, postId, comment);
        if (result.data) {
            res.status(200).json({
                success: true,
                message: 'comment added successfully',
                data: result.data
            });
        }
        else {
            throw new Error('error while adding comment');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.postComment = postComment;
const putCommentLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const { userId } = req.body;
        const result = yield (0, postRepository_1.likeComment)(postId, commentId, userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'comment liked successfully',
                data: result
            });
        }
        else {
            throw Error('error while liking comment');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.putCommentLike = putCommentLike;
const deleteCommentRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const result = yield (0, postRepository_1.deleteComment)(postId, commentId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'comment deleted successfully',
                data: result
            });
        }
        else {
            throw Error('error while deleting comment');
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.deleteCommentRoute = deleteCommentRoute;
const putEditComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const { editedComment } = req.body;
        const result = yield (0, postRepository_1.updateComment)(postId, commentId, editedComment);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'comment updated successfully',
                data: result
            });
        }
        else {
            throw Error('error while updating comment');
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.mesage
        });
    }
});
exports.putEditComment = putEditComment;
