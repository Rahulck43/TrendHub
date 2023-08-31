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
const userLoginUseCase_1 = require("../../../useCases/user/userLoginUseCase");
const authUtils_1 = require("../../../adapters/auth/authUtils");
// const loginRouter = Router()
const loginRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const userExist = yield (0, userLoginUseCase_1.postLogin)({ userName, password });
        if (userExist === null || userExist === void 0 ? void 0 : userExist.success) {
            const token = yield (0, authUtils_1.generateJwtToken)(userExist.user);
            res.cookie('jwtToken', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
            res.status(200).json({
                message: 'user login successful',
                success: true,
                user: userExist.user
            });
        }
        else {
            res.status(200).json({
                message: userExist === null || userExist === void 0 ? void 0 : userExist.message,
                success: false
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
});
exports.default = loginRouter;
