import { findById, like, unLike } from "../../adapters/repositories/postRepository"



const likePost = async (postId: string, userId: string) => {
    try {
        const post = await findById(postId)
        if (!post) {
            throw new Error('couldnt find the post')
        }
        if (!post.likes?.includes(userId)) {
            const updatedPost = await like(postId, userId)
            return {
                success: true,
                data: updatedPost,
                message: 'post has been liked'
            }
        } else {
            const updatedPost = await unLike(postId, userId)
            return {
                success: true,
                data: updatedPost,
                message: 'post has been unliked'
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


export { likePost }