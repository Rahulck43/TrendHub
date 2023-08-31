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
exports.updateUser = exports.getUserData = exports.unBlockUser = exports.blockUser = exports.findUserByMobile = exports.findUserByUserName = exports.findUserByEmail = exports.saveUser = exports.findUser = void 0;
const userModel_1 = __importDefault(require("../../entities/userModel"));
const postModel_1 = __importDefault(require("../../entities/postModel"));
const findUser = (email, mobile, userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ $or: [{ email }, { mobile }, { userName }] });
        if (user) {
            if (user.email === email)
                return { field: 'email', value: email, user };
            if (user.mobile === mobile)
                return { field: 'mobile', value: mobile, user };
            if (user.userName === userName)
                return { field: 'userName', value: userName, user };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error(error.message);
        throw new Error('Error finding user');
    }
});
exports.findUser = findUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email });
    try {
        if (user) {
            return {
                user,
                success: true
            };
        }
        else {
            return {
                success: false,
                message: `${email} not found, please login`
            };
        }
    }
    catch (error) {
        throw new Error('error finding user by email');
    }
});
exports.findUserByEmail = findUserByEmail;
const findUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ userName });
    try {
        if (user) {
            return {
                user,
                success: true
            };
        }
        else {
            return {
                success: false,
                message: `${userName} not found, please login`
            };
        }
    }
    catch (error) {
        throw new Error('error finding user by user name');
    }
});
exports.findUserByUserName = findUserByUserName;
const findUserByMobile = (mobile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the mobile argument is a number or can be converted to a number
        const parsedMobile = parseInt(mobile, 10);
        if (isNaN(parsedMobile)) {
            return {
                success: false,
                message: 'Invalid mobile number format',
            };
        }
        const user = yield userModel_1.default.findOne({ mobile: parsedMobile });
        if (user) {
            return {
                success: true,
                user,
            };
        }
        else {
            return {
                success: false,
                message: 'User not found',
            };
        }
    }
    catch (error) {
        console.log(error.message);
        throw new Error('Error finding user by mobile number');
    }
});
exports.findUserByMobile = findUserByMobile;
const saveUser = ({ name, email, mobile, userName, hashedPass }) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new userModel_1.default({
        name: name,
        email: email,
        mobile: mobile,
        userName: userName,
        password: hashedPass
    });
    yield newUser.save();
    return newUser;
});
exports.saveUser = saveUser;
const blockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.findByIdAndUpdate(id, {
            isBlocked: true
        });
        return true;
    }
    catch (error) {
        console.error(error.message);
        throw new Error('error blocking user');
    }
});
exports.blockUser = blockUser;
const unBlockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.findByIdAndUpdate(id, {
            isBlocked: false
        });
        return true;
    }
    catch (error) {
        console.error(error.message);
        throw new Error('error unblocking user');
    }
});
exports.unBlockUser = unBlockUser;
const getUserData = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield userModel_1.default.findOne({ userName });
        if (!userData) {
            return false;
        }
        const userPosts = yield postModel_1.default.find({ userId: userData._id });
        return {
            userData,
            userPosts
        };
    }
    catch (error) {
        console.error(error.message);
        throw new Error('Error at getUserData');
    }
});
exports.getUserData = getUserData;
const updateUser = ({ userId, name, bio, location, secure_url }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (secure_url) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, {
                name,
                bio,
                location,
                dp: secure_url
            }, { new: true });
            if (updatedUser) {
                return ({
                    success: true,
                    updatedUser,
                    message: 'updated'
                });
            }
            else {
                throw new Error('error updating user');
            }
        }
        else {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, {
                name,
                bio,
                location
            }, { new: true });
            if (updatedUser) {
                return ({
                    success: true,
                    updatedUser,
                    message: 'updated'
                });
            }
            else {
                throw new Error('error updating user');
            }
        }
    }
    catch (error) {
        console.error(error.message);
        throw new Error('error updating the user');
    }
});
exports.updateUser = updateUser;
