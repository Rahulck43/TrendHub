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
exports.configureSocketIo = void 0;
const messageRepository_1 = require("../repositories/messageRepository");
const configureSocketIo = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        console.log(socket.id);
        socket.on('sendMessage', (messageData) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('new message', messageData);
            yield (0, messageRepository_1.saveMessage)(messageData);
            io.emit('sendMessage', messageData.message);
        }));
    });
    io.on('disconnect', (socket) => {
        console.log('user disconnected');
    });
    io.on('sendMessage', (socket) => {
        console.log('a user connected', socket);
    });
};
exports.configureSocketIo = configureSocketIo;
