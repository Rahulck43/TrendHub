import { Request, Response } from "express";
import { getUserData } from "../../../adapters/repositories/userRepository";



const profileRouter = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        const {userData,userPosts}: any = await getUserData(userId)
        if (userData) {
            res.status(200).json({
                success: true,
                message: 'user data retrieved successfully',
                userData,userPosts
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'error finding user data',
                userData
            })
        }
    } catch (error: any) {
        console.error(error.message)
        res.status(400).json({
            success: false,
            message: 'unexpected error'
        })
    }
}




export default profileRouter