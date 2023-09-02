import { follow, unfollow } from "../../adapters/repositories/followRepository"
import { findUserById } from "../../adapters/repositories/userRepository"
import { IUser } from "../../entities/userModel"


const followUnfollowUser= async(userId:string,followerId:string)=>{
    try {
        const user = await findUserById(userId)
        const follower= await findUserById(followerId) 
        if (!user ||! follower) {
            throw new Error('couldnt find the user or follower')
        }
        if (!user.following?.includes(followerId)) {
            const updatedUser = await follow(userId,followerId)
            return {
                success: true,
                data: updatedUser,
                message: 'followed successfully'
            }
        } else {
            const updatedUser = await unfollow(userId,followerId)
            return {
                success: true,
                data: updatedUser,
                message: 'unfollowed successfully'
            }
        }
    } catch (error: any) {
        console.error(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}



export {followUnfollowUser}