import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    _id:string;
    name: string;
    email: string
    mobile: number | string;
    userName: string;
    password: string;
    dp?: string;
    gender?: string
    isBlocked?: boolean;
    DOB?: Date | string;
    bio: string,
    location: string
    followers: string[]
    following: string[];
}

const userModel: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: Number,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dp: {
        type: String,

    },
    gender: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    DOB: {
        type: Date
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    following:{
        type:[ String],
        ref: "User",
    },
    followers:{
        type:[ String],
        ref: "User",
    },
    // saved:{
    //     type: Array
    // notifications:{
    //     type: Array
    // },
    // }

},
    { timestamps: true }
)

const user: Model<IUser> = mongoose.model<IUser>("User", userModel)
export default user
export {IUser}