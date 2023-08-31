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
const updateUserUseCase_1 = require("../../../useCases/admin/updateUserUseCase");
const unblockUserRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updatedUsers = yield (0, updateUserUseCase_1.unBlockUserUseCase)(userId);
        if (updatedUsers) {
            res.status(200).json({
                success: true,
                message: 'updated usesrlist returned successfully',
                updatedUsers
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'error at interface',
            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: 'unexpected error',
        });
    }
});
exports.default = unblockUserRouter;
