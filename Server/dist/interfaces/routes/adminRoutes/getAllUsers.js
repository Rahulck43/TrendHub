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
const allUsersUseCase_1 = require("../../../useCases/admin/allUsersUseCase");
const getAllUsersRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, allUsersUseCase_1.getAllusers)();
        if (allUsers) {
            res.status(200).json({
                success: true,
                message: 'all users fetched successfully',
                allUsers: allUsers
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'error fetching users list',
            });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send({
            success: false,
            message: 'unexpeccted error while fetching usesrs list'
        });
    }
});
exports.default = getAllUsersRouter;
