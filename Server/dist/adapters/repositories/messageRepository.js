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
exports.saveMessage = exports.getChat = void 0;
const messageModel_1 = __importDefault(require("../../entities/messageModel"));
const saveMessage = (messageData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!messageData) {
        throw Error('message data not found');
    }
    const newMessage = new messageModel_1.default(messageData);
    yield newMessage.save();
});
exports.saveMessage = saveMessage;
const getChat = (user1, user2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user1 || !user2) {
            throw Error('participants not found');
        }
        console.log(user1, user2);
        const messages = yield messageModel_1.default.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },
            ],
        }).sort({ createdAt: 1 });
        return messages;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getChat = getChat;
