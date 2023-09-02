import userModel from "../../entities/userModel";


const follow=async(userId:string,followerId:string)=>{
    try {
        const follower= await userModel.findById(followerId)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $push: { following: follower?._id } },
            { new: true }
        )
        if (updatedUser) {
            return updatedUser
        } else {
            throw new Error('error while following')
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('unexpected error while following')
    }
}

const unfollow = async (userId: string, followerId: string) => {
    try {
        const follower= await userModel.findById(followerId)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { following: follower?._id } },
            { new: true }
        )
        if (updatedUser) {
            return updatedUser
        } else {
            throw new Error('error while unfollowing')
        }
    } catch (error: any) {
        console.error(error.mesasge)
        throw new Error('unexpected error while unfollowing')
    }
}



export {follow,unfollow}