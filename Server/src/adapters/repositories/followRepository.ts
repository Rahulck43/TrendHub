import userModel from "../../entities/userModel";


const follow = async (userId: string, followerId: string) => {
    try {
        console.log('follow',userId,followerId)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $push: { following: followerId } },
            { new: true }
        ).populate('followers').populate('following')
        if (updatedUser) {
          const updatedFollow=  await userModel.findByIdAndUpdate(
                followerId,
                { $push: { followers: userId } },
                { new: true }
            ).populate('followers').populate('following')
            return {updatedUser,updatedFollow}
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
        console.log('Unfollow',userId,followerId)

        const follower = await userModel.findById(followerId)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { following: follower?._id } },
            { new: true }
        ).populate('followers').populate('following')
        if (updatedUser) {
          const updatedFollow=  await userModel.findByIdAndUpdate(
                followerId,
                { $pull: { followers: userId } },
                { new: true }
            ).populate('followers').populate('following')
            return {updatedUser,updatedFollow}
        } else {
            throw new Error('error while unfollowing')
        }
    } catch (error: any) {
        console.error(error.mesasge)
        throw new Error('unexpected error while unfollowing')
    }
}


const getSuggestedUsersList = async (userId: string) => {
    try {
        const suggestions = await userModel.find({ 
            _id: { $ne: userId } ,
            followers:{$nin:[userId]}
        })
        if (suggestions) {
            return suggestions
        } else throw new Error('error finding suggestions')
    } catch (error: any) {
        throw error(error)
    }
}

export { follow, unfollow, getSuggestedUsersList }