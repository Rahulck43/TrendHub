import mongoose, { Schema, Document, Model } from "mongoose";
import { Post } from "./types";

interface IPost extends Document, Post { }

const postModel: Schema<IPost> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
    },
    img: {
        type: String,
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            likes: {
                type: [String],
                default: []
            }
        }
    ],
    isBloked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const post: Model<IPost> = mongoose.model<IPost>("Post", postModel);
export default post;
