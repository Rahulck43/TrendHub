import mongoose from "mongoose";

interface Comment {
  _id:mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId;
    comment: string;
    createdAt?: Date;
    likes?: string[];
}

interface Post {
    userId?: mongoose.Types.ObjectId;
    caption?: string;
    img?: string;
    likes?: string[];
    comments?: Comment[];
    isBloked?:Boolean
}

interface ReportPost {
  post?: string;
  reason?: string;
  reporters?: string[]
}

export { Post,Comment,ReportPost };
