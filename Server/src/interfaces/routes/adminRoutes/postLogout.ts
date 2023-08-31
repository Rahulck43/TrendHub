import {Request, Response } from "express";



const postLogoutRouter=(req:Request,res:Response)=>{
    try {
        res.clearCookie('adminToken')
        res.status(200).json({
            success:true,
            message:'admin logged out successfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'admin logout failed'
        })
    }
}


export default postLogoutRouter