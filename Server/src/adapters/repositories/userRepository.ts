import userModel from "../../entities/userModel"
import postModel from "../../entities/postModel";
import cloudinary from "../utils/cloudinary";


const findUser = async (email?: String, mobile?: Number, userName?: String) => {
    try {
        const user = await userModel.findOne({ $or: [{ email }, { mobile }, { userName }] });
        if (user) {
            if (user.email === email) return { field: 'email', value: email, user };
            if (user.mobile === mobile) return { field: 'mobile', value: mobile, user };
            if (user.userName === userName) return { field: 'userName', value: userName, user };
        } else {
            return null
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('Error finding user')
    }
}

const findUserById= async(userId:string)=>{
    try {
        const user = await userModel.findById(userId)
        if (user) return user
        else return false
    } catch (error) {
        throw new Error('unexpected error while finding user')
    }
}



const findUserByEmail = async (email: string | number) => {
    const user = await userModel.findOne({ email })
    try {
        if (user) {
            return {
                user,
                success: true
            }
        } else {
            return {
                success: false,
                message: `${email} not found, please login`
            }
        }

    } catch (error) {
        throw new Error('error finding user by email')
    }
}

const findUserByUserName = async (userName: string | number) => {
    const user = await userModel.findOne({ userName })
    try {
        if (user) {
            return {
                user,
                success: true
            }
        } else {
            return {
                success: false,
                message: `${userName} not found, please login`
            }
        }

    } catch (error) {
        throw new Error('error finding user by user name')
    }
}

const findUserByMobile = async (mobile: number | string) => {
    try {
        // Check if the mobile argument is a number or can be converted to a number
        const parsedMobile = parseInt(mobile as string, 10);
        if (isNaN(parsedMobile)) {
            return {
                success: false,
                message: 'Invalid mobile number format',
            };
        }
        const user = await userModel.findOne({ mobile: parsedMobile });
        if (user) {
            return {
                success: true,
                user,
            };
        } else {
            return {
                success: false,
                message: 'User not found',
            };
        }
    } catch (error: any) {
        console.log(error.message);
        throw new Error('Error finding user by mobile number');
    }
};




const saveUser = async ({ name, email, mobile, userName, hashedPass }: { name: string, email: string, mobile: number, userName: string, hashedPass: string }) => {
    const newUser = new userModel({
        name: name,
        email: email,
        mobile: mobile,
        userName: userName,
        password: hashedPass
    })
    await newUser.save()
    return newUser
}


const blockUser = async (id: string) => {
    try {
        await userModel.findByIdAndUpdate(id, {
            isBlocked: true
        })
        return true
    } catch (error: any) {
        console.error(error.message)
        throw new Error('error blocking user')
    }
}

const unBlockUser = async (id: string) => {
    try {
        await userModel.findByIdAndUpdate(id, {
            isBlocked: false
        })
        return true
    } catch (error: any) {
        console.error(error.message)
        throw new Error('error unblocking user')
    }
}

const getUserData = async (userName: string) => {
    try {
        const userData = await userModel.findOne({ userName });
        if (!userData) {
            return false;
        }
        const userPosts = await postModel.find({ userId: userData._id });
        return {
            userData,
            userPosts
        };
    } catch (error: any) {
        console.error(error.message);
        throw new Error('Error at getUserData');
    }
}

const updateUser = async ({ userId, name, bio, location,secure_url }: { userId: string, name: string, bio: string, location: string,secure_url:string }) => {
    try {
        if(secure_url){
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    name,
                    bio,
                    location,
                    dp:secure_url
                },
                { new: true }
            )
            if (updatedUser) {
                return ({
                    success: true,
                    updatedUser,
                    message:'updated'
                })
            } else {
                throw new Error('error updating user')
            }
        }else{
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    name,
                    bio,
                    location
                },
                { new: true }
            )
            if (updatedUser) {
                return ({
                    success: true,
                    updatedUser,
                    message:'updated'
                })
            } else {
                throw new Error('error updating user')
            }
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('error updating the user')
    }
}

export { findUser,findUserById, saveUser, findUserByEmail, findUserByUserName, findUserByMobile, blockUser, unBlockUser, getUserData, updateUser }