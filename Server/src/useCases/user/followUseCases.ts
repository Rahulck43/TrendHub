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
        if (!user.following?.includes(follower._id)) {
            console.log('calling follow')
            const updatedUser = await follow(user._id,follower._id)
            return {
                success: true,
                data: updatedUser,
                message: 'followed successfully'
            }
        } else {
            console.log('calling unfollow')

            const updatedUser = await unfollow(user._id,follower._id)
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