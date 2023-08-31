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
exports.getAllusers = void 0;
const allUsersRepository_1 = require("../../adapters/repositories/allUsersRepository");
const getAllusers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, allUsersRepository_1.findAllUsers)();
        if (allUsers) {
            return allUsers;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error.message);
        throw new Error('error at getting all users');
    }
});
exports.getAllusers = getAllusers;
