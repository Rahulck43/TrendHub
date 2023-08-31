import { Error } from "mongoose";
import postModel from "../../entities/postModel";
import { Comment, Post } from "../../entities/types";
import mongoose from "mongoose";


const savePost = async (post: Post) => {
    try {
        const newPost = new postModel(post)
        const savedPost = await newPost.save()
        if (savedPost) {
            return savedPost
        } else {
            return false
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('unexpected error while creating post')
    }
}

const findById = async (postId: string) => {
    try {
        const post = await postModel.findById(postId).populate("comments.userId");
        if (post) return post
        else return false
    } catch (error) {
        throw new Error('unexpected error while finding post')
    }
}

const updatePost = async (postId: string, caption: string) => {
    try {
        const updatedPost = await postModel.findByIdAndUpdate(postId, { caption }, { new: true })
        if (updatedPost) {
            return updatedPost
        } else {
            throw new Error('error while updating post')
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('unexpected error while updating post')
    }
}

const deleteById = async (postId: string) => {
    try {
        const result = await postModel.findByIdAndDelete(postId)
        if (result) {
            return true
        } else {
            throw new Error('error while updating post')
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('unexpected error while deleting post')
    }
}



const like = async (postId: string, userId: string) => {
    try {
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { $push: { likes: userId } },
            { new: true }
        )
        if (updatedPost) {
            return updatedPost
        } else {
            throw new Error('error while updating like')
        }
    } catch (error: any) {
        console.error(error.message)
        throw new Error('unexpected error while updating likes')
    }
}

const unLike = async (postId: string, userId: string) => {
    try {
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        )
        if (updatedPost) {
            return updatedPost
        } else {
            throw new Error('error while updating like')
        }
    } catch (error: any) {
        console.error(error.mesasge)
        throw new Error('unexpected error while updating likes')
    }
}



const addComment = async (userId: string, postId: string, comment: string) => {
    try {
        const result = await postModel
            .findByIdAndUpdate(
                postId,
                {
                    $push: { comments: { userId, comment } }
                },
                { new: true }
            )
            .populate("comments.userId");

        if (result) {
            return { data: result, success: true };
        } else {
            throw new Error('Error while adding comment');
        }
    } catch (error: any) {
        console.error(error.message);
        throw new Error('Unexpected error while adding comment');
    }
}



const likeComment = async (postId: string, commentId: string, userId: string) => {
    try {
        const existingPost = await postModel.findById(postId);
        if (!existingPost) {
            throw new Error("Post not found");
        }
        if (!existingPost.comments) {
            throw new Error("No comments found");
        }
        const commentArray = existingPost.comments;
        const commentIndex = commentArray.findIndex(
            (comment) => comment?._id?.toString() === commentId
        );
        if (commentIndex === -1) {
            throw new Error("Comment not found");
        }
        const specificComment = commentArray[commentIndex];
        const likedByUser = specificComment.likes?.includes(userId);
        if (likedByUser) {
            specificComment.likes = specificComment.likes?.filter(likeUserId => likeUserId !== userId);
        } else {
            specificComment.likes = [...(specificComment.likes || []), userId];
        }
        existingPost.comments[commentIndex] = specificComment;
        await existingPost.save();
        return existingPost;
    } catch (error) {
        throw error;
    }
};


const deleteComment = async (postId: string, commentId: string) => {
    try {
        const existingPost = await postModel.findById(postId);
        if (!existingPost) {
            throw new Error("Post not found");
        }
        if (!existingPost.comments) {
            throw new Error("No comments found");
        }
        const commentArray = existingPost.comments;
        const commentIndex = commentArray.findIndex(
            (comment) => comment?._id?.toString() === commentId
        );
        if (commentIndex === -1) {
            throw new Error("Comment not found");
        }
        commentArray.splice(commentIndex, 1);
        await existingPost.save();
        return existingPost;
    } catch (error) {
        throw error;
    }
};

const updateComment=async(postId:string,commentId:string,editedComment:string)=>{
    try {
        const existingPost = await postModel.findById(postId);
        if (!existingPost) {
            throw new Error("Post not found");
        }
        if (!existingPost.comments) {
            throw new Error("No comments found");
        }
        const commentArray = existingPost.comments;
        const commentIndex = commentArray.findIndex(
            (comment) => comment?._id?.toString() === commentId
        );
        if (commentIndex === -1) {
            throw new Error("Comment not found");
        }
        commentArray[commentIndex].comment=editedComment
        await existingPost.save();
        return existingPost;
    } catch (error) {
        throw error;
    }
}


export { savePost, findById, updatePost, deleteById, like, unLike, addComment,likeComment,deleteComment,updateComment }