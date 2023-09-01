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
exports.deletePost = exports.getReports = void 0;
const reportPostRepository_1 = require("../../../adapters/repositories/reportPostRepository");
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, reportPostRepository_1.getAllReports)();
        if (result) {
            res.status(200).json({
                success: true,
                message: 'all reports fetched successfully',
                data: result
            });
        }
        else {
            res.status(400).json({
                success: true,
                message: 'error fetching all reports',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: 'error fetching all reports',
        });
    }
});
exports.getReports = getReports;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const reportId = req.params.reportId;
        const success = yield (0, reportPostRepository_1.deleteReportedPost)(postId);
        if (success) {
            const result = yield (0, reportPostRepository_1.deleteReport)(reportId);
            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Post deleted successfully',
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'Post not found or deletion failed',
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: 'error deleting post',
        });
    }
});
exports.deletePost = deletePost;
