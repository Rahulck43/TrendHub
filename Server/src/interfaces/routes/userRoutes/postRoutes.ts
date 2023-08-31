import { Request, Response } from "express"
import { deleteById, findById, savePost, updatePost, addComment, likeComment,deleteComment,updateComment } from "../../../adapters/repositories/postRepository"
import cloudinaryUpload from "../../../adapters/middlewares/cloudinaryUpload"
import { likePost } from "../../../useCases/user/postUseCases"
import { reportPost } from "../../../adapters/repositories/reportPostRepository"


const createPost = async (req: Request, res: Response) => {
    try {
        const newPost = req.body
        const file = req.file

        if (!newPost || !file) {
            throw new Error('Post details not found');
        }
        if (file) {
            const secure_url = await cloudinaryUpload(file)
            newPost.img = secure_url;
        }
        const savedPost = await savePost(newPost)
        if (savedPost) {
            res.status(200).json({
                success: true,
                message: 'post saved successfullly',
                data: savedPost
            })
        } else {
            throw new Error('error while saving post')
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

const editPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { editedPost,userId } = req.body;
        if (!postId || !userId) {
            throw new Error('Post or user details not found');
        }
        const post = await findById(postId);
        if (post && (post.userId ?? null)?.equals(userId)) {
            const updatedPost = await updatePost(postId, editedPost);
            res.status(200).json({
                success: true,
                message: 'Post updated successfully',
                data: updatedPost
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Unauthorized to edit this post'
            });
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const userId = req.query.userId;
        if (!postId || !userId) {
            throw new Error('Post or user details not found');
        }
        const post = await findById(postId);
        if (post && (post.userId?.toString() ===userId)) {
            const result = await deleteById(postId)
            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'Post deleted successfully',
                });
            } else {
                throw new Error('error while deleting post')
            }
        } else {
            res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this post'
            });
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const postReport=async(req:Request,res:Response)=>{
    try {
        const {userId,reason}=req.body
        const postId=req.params.id
        if(!postId || !userId){
            res.status(400).json({
                success: false,
                message: 'details not found'
            })
        }
        const result=await reportPost(userId,reason,postId)
        if(result){
            res.status(200).json({
                success: true,
                message: result.message,
            })
        }
    } catch (error:any) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

const updateLike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const { userId } = req.body
        const result = await likePost(postId, userId)
        if (result?.success) {
            res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            })
        } else {
            console.error(result.message);
            throw Error(result.message)
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

const getPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        const result = await findById(postId)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'post data fetched successfully',
                data: result
            })
        } else {
            throw Error('unable to get post details')
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

const postComment = async (req: Request, res: Response) => {
    try {
        const { userId, comment } = req.body
        const postId = req.params.id
        if (!userId || !comment || !postId) {
            throw new Error('data missing to add comment')
        }
        const result = await addComment(userId, postId, comment)
        if (result.data) {
            res.status(200).json({
                success: true,
                message: 'comment added successfully',
                data: result.data
            })
        } else {
            throw new Error('error while adding comment')
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

const putCommentLike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId
        const commentId = req.params.commentId
        const { userId } = req.body
        const result = await likeComment(postId,commentId, userId)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'comment liked successfully',
                data: result
            })
        } else {
            throw Error('error while liking comment')
        }
    } catch (error: any) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

const deleteCommentRoute=async(req:Request,res:Response)=>{
    try {
        const postId = req.params.postId
        const commentId = req.params.commentId
        const result = await deleteComment(postId,commentId,)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'comment deleted successfully',
                data: result
            })
        } else {
            throw Error('error while deleting comment')
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

const putEditComment=async(req:Request,res:Response)=>{
    try {
        const postId = req.params.postId
        const commentId = req.params.commentId
        const {editedComment}=req.body
        const result = await updateComment(postId,commentId,editedComment)
        if (result) {
            res.status(200).json({
                success: true,
                message: 'comment updated successfully',
                data: result
            })
        } else {
            throw Error('error while updating comment')
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}

export { createPost, editPost, deletePost, updateLike, getPost, postComment, putCommentLike, deleteCommentRoute,putEditComment,postReport }