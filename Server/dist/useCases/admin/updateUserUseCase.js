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
exports.unBlockUserUseCase = exports.blockUserUseCase = void 0;
const userRepository_1 = require("../../adapters/repositories/userRepository");
const allUsersUseCase_1 = require("./allUsersUseCase");
const blockUserUseCase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userRepository_1.blockUser)(id);
        if (result) {
            const allUsers = yield (0, allUsersUseCase_1.getAllusers)();
            return allUsers;
        }
        else
            return false;
    }
    catch (error) {
        console.error(error.message);
        throw new Error('error in usecase');
    }
});
exports.blockUserUseCase = blockUserUseCase;
const unBlockUserUseCase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userRepository_1.unBlockUser)(id);
        if (result) {
            const allUsers = yield (0, allUsersUseCase_1.getAllusers)();
            return allUsers;
        }
        else
            return false;
    }
    catch (error) {
        console.error(error.message);
        throw new Error('error in usecase');
    }
});
exports.unBlockUserUseCase = unBlockUserUseCase;
