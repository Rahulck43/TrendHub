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
const loginUseCase_1 = require("../../../useCases/admin/loginUseCase");
const adminAuthUtils_1 = require("../../../adapters/auth/adminAuthUtils");
const postLoginRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isValid = (0, loginUseCase_1.adminValidate)({ email, password });
        if (isValid.success) {
            const jwtToken = yield (0, adminAuthUtils_1.generateAdminToken)(isValid.admin);
            res.cookie('adminToken', jwtToken);
            res.status(200).json({
                success: true,
                message: 'admin login successful',
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'invalid email or password'
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send({
            success: false,
            message: 'unexpected error at login'
        });
    }
});
exports.default = postLoginRouter;
