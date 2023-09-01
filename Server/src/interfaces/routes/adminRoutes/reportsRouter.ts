import { Request, Response } from "express";
import { deleteReportedPost, getAllReports,deleteReport } from "../../../adapters/repositories/reportPostRepository";



const getReports = async (req: Request, res: Response) => {
    try {

        const result = await getAllReports()
        if (result) {
            res.status(200).json({
                success: true,
                message: 'all reports fetched successfully',
                data: result
            })
        } else {
            res.status(400).json({
                success: true,
                message: 'error fetching all reports',
            })
        }
    } catch (error) {
        res.status(400).json({
            success: true,
            message: 'error fetching all reports',
        })
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const reportId=req.params.reportId
       const success= await deleteReportedPost(postId)
       if(success){
          const result= await deleteReport(reportId)
           if (result) {
               res.status(200).json({
                   success: true,
                   message: 'Post deleted successfully',
               })
           } else {
               res.status(404).json({
                   success: false,
                   message: 'Post not found or deletion failed',
               });
           }
       }
    } catch (error) {
        res.status(400).json({
            success: true,
            message: 'error deleting post',
        })
    }
}



export { getReports, deletePost }