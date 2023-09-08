import { Types } from "mongoose";

interface Comment {
  _id:Types.ObjectId
    userId: Types.ObjectId;
    comment: string;
    createdAt?: Date;
    likes?: string[];
}

interface Post {
    userId?: Types.ObjectId;
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

interface Message {
  sender:Types.ObjectId
  recipient:Types.ObjectId
  message:string
}

export { Post,Comment,ReportPost,Message };
