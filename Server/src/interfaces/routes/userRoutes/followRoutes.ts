import { Request,Response } from "express"
import { decodeUser } from "../../../adapters/middlewares/userAuth"
import { followUnfollowUser } from "../../../useCases/user/followUseCases"

const followUnfollow=async(req:Request,res:Response)=>{
    try {
        const token = req.cookies.jwtToken
        const userId=await decodeUser(token)
        const followerId=req.params.id
       const result= await followUnfollowUser(userId,followerId)
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
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: error.mesage
        })
    }
}


export{followUnfollow}