import mongoose, { Schema, Document, Model } from "mongoose";
import { ReportPost } from "./types";

interface IReportPost extends Document, ReportPost { }

const reportPost: Schema<IReportPost> = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    reason: {
        type: String,
    },
    reporters:{
        type: [],
        ref: "User",
        required: true
    }
}, { timestamps: true });

const reportPostModel: Model<IReportPost> = mongoose.model<IReportPost>("ReportPost", reportPost);
export default reportPostModel;
