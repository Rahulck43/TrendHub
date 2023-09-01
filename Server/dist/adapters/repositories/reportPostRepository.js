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
exports.findReportByPostIdAndDelete = exports.deleteReport = exports.deleteReportedPost = exports.getAllReports = exports.reportPost = void 0;
const reportedPostModel_1 = __importDefault(require("../../entities/reportedPostModel"));
const postModel_1 = __importDefault(require("../../entities/postModel"));
const reportPost = (userId, reason, postId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const postExist = yield reportedPostModel_1.default.findOne({ post: postId });
        if (postExist) {
            if ((_a = postExist === null || postExist === void 0 ? void 0 : postExist.reporters) === null || _a === void 0 ? void 0 : _a.toString().includes(userId)) {
                return ({ message: 'you already reported this post' });
            }
            else {
                (_b = postExist.reporters) === null || _b === void 0 ? void 0 : _b.push(userId);
            }
        }
        else {
            const newReport = new reportedPostModel_1.default({
                post: postId,
                reason,
                reporters: [userId]
            });
            const savedPost = yield newReport.save();
            if (savedPost) {
                return { savedPost, message: 'post reported successfully' };
            }
            else {
                return false;
            }
        }
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
});
exports.reportPost = reportPost;
const getAllReports = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportsList = yield reportedPostModel_1.default.find().populate('post');
        if (reportsList) {
            return reportsList;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getAllReports = getAllReports;
const deleteReport = (reportId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield reportedPostModel_1.default.findByIdAndDelete(reportId);
        return ({ success: true });
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.deleteReport = deleteReport;
const deleteReportedPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postModel_1.default.findByIdAndDelete(postId);
        return ({ success: true });
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.deleteReportedPost = deleteReportedPost;
const findReportByPostIdAndDelete = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield reportedPostModel_1.default.findOne({ post: postId });
        if (report) {
            yield reportedPostModel_1.default.findByIdAndDelete(report._id);
        }
        else
            return;
    }
    catch (error) {
        throw error;
    }
});
exports.findReportByPostIdAndDelete = findReportByPostIdAndDelete;
