import reportPostModel from "../../entities/reportedPostModel";
import postModel from "../../entities/postModel";


const reportPost = async (userId: string, reason: string, postId: string) => {
    try {
        const postExist = await reportPostModel.findOne({ post: postId })
        if (postExist) {
            if (postExist?.reporters?.toString().includes(userId)) {
                return ({ message: 'you already reported this post' })
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
                return { savedPost, message: 'post reported successfully' }
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

const deleteReport = async (reportId: string) => {
    try {
        await reportPostModel.findByIdAndDelete(reportId)
        return ({ success: true })
    } catch (error: any) {
        throw Error(error.message)
    }
}

const deleteReportedPost = async (postId: string) => {
    try {
        await postModel.findByIdAndDelete(postId)
        return ({ success: true })
    } catch (error: any) {
        throw Error(error.message)
    }
}

const findReportByPostIdAndDelete = async (postId: string) => {
    try {
        const report = await reportPostModel.findOne({ post: postId })
        if (report) {
            await reportPostModel.findByIdAndDelete(report._id)
        }else return
    } catch (error) {
        throw error
    }
}

export { reportPost, getAllReports, deleteReportedPost, deleteReport, findReportByPostIdAndDelete }