"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logoutRouter = (req, res) => {
    try {
        res.clearCookie('jwtToken');
        res.status(200).json({
            success: true,
            message: 'user logged out successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'user logout failed'
        });
    }
};
exports.default = logoutRouter;
