"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postLogoutRouter = (req, res) => {
    try {
        res.clearCookie('adminToken');
        res.status(200).json({
            success: true,
            message: 'admin logged out successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'admin logout failed'
        });
    }
};
exports.default = postLogoutRouter;
