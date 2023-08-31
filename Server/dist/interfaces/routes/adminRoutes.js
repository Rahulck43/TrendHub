"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = __importDefault(require("../../adapters/middlewares/adminAuth"));
const postLogin_1 = __importDefault(require("./adminRoutes/postLogin"));
const postLogout_1 = __importDefault(require("./adminRoutes/postLogout"));
const getAllUsers_1 = __importDefault(require("./adminRoutes/getAllUsers"));
const blockUserRouter_1 = __importDefault(require("./adminRoutes/blockUserRouter"));
const unblockUserRouter_1 = __importDefault(require("./adminRoutes/unblockUserRouter"));
const reportsRouter_1 = require("./adminRoutes/reportsRouter");
const adminRouter = (0, express_1.Router)();
adminRouter.post('/login', postLogin_1.default);
adminRouter.post('/logout', postLogout_1.default);
adminRouter.get('/allUsers', adminAuth_1.default, getAllUsers_1.default);
adminRouter.patch('/blockUser/:id', adminAuth_1.default, blockUserRouter_1.default);
adminRouter.patch('/unblockUser/:id', adminAuth_1.default, unblockUserRouter_1.default);
adminRouter.get('/reports', adminAuth_1.default, reportsRouter_1.getReports);
exports.default = adminRouter;
