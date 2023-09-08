import mongoose, { Schema, Document, Model } from "mongoose";
import { Message } from "./types";

interface IMessage extends Document, Message { }

const message: Schema<IMessage> = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required:true
    },
}, { timestamps: true });

const messageModel: Model<IMessage> = mongoose.model<IMessage>("Message", message);
export default messageModel;
