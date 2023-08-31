import reportPostModel from "../../entities/reportedPostModel";


const reportPost = async (userId: string, reason: string, postId: string) => {
    try {
        const postExist = await reportPostModel.findOne({ post: postId })
        if (postExist) {
            if (postExist?.reporters?.toString().includes(userId)) {
                return({message:'you already reported this post'})
            } else {
                postExist.reporters?.push(userId)
            }
        } else {
            const newReport = new reportPostModel({
                post: postId,
                reason,
                reporters: [userId]
            })
            const savedPost = await newReport.save()
            if (savedPost) {
                return {savedPost,message:'post reported successfully'}
            } else {
                return false
            }
        }
    } catch (error: any) {
        console.error(error.message)
        throw error
    }
}

const getAllReports = async () => {
    try {
        const reportsList = await reportPostModel.find().populate('post')
        if (reportsList) {
            return reportsList
        }
    } catch (error) {
        throw error
    }
}


export { reportPost, getAllReports }