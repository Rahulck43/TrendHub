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
exports.editProfile = void 0;
const userRepository_1 = require("../../../adapters/repositories/userRepository");
const cloudinary_1 = __importDefault(require("../../../adapters/utils/cloudinary"));
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.id;
        const { name, bio, location } = req.body;
        const file = req.file;
        if (file) {
            const streamUpload = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary_1.default.uploader.upload_stream((error, result) => {
                        if (result) {
                            resolve(result);
                        }
                        else {
                            reject(error);
                        }
                    });
                    stream.write(fileBuffer);
                    stream.end();
                });
            };
            const result = yield streamUpload((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.buffer);
            const { success, message, updatedUser } = yield (0, userRepository_1.updateUser)({ userId, name, bio, location, secure_url: result.secure_url });
            if (success) {
                res.status(200).json({
                    success: true,
                    message: 'updated successfully',
                    updatedUser
                });
            }
            else {
                res.status(409).json({
                    success: false,
                    message: message
                });
            }
        }
        else {
            let secure_url = '';
            const { success, message, updatedUser } = yield (0, userRepository_1.updateUser)({ userId, name, bio, location, secure_url });
            if (success) {
                res.status(200).json({
                    success: true,
                    message: 'updated successfully',
                    updatedUser
                });
            }
            else {
                res.status(409).json({
                    success: false,
                    message: message
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'unexpected error'
        });
    }
});
exports.editProfile = editProfile;
