import { Request, Response } from "express";
import {  updateUser } from "../../../adapters/repositories/userRepository";
import cloudinary from "../../../adapters/utils/cloudinary";
import { getChat } from "../../../adapters/repositories/messageRepository";




const editProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const { name, bio, location } = req.body
        const file = req.file
        if (file) {
            const streamUpload = (fileBuffer:any) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream((error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    });
                    stream.write(fileBuffer);
                    stream.end();
                });
            };
            const result:any = await streamUpload(req?.file?.buffer);
            const { success, message, updatedUser } = await updateUser({ userId, name, bio, location, secure_url: result.secure_url   })
            if (success) {
                res.status(200).json({
                    success: true,
                    message: 'updated successfully',
                    updatedUser
                })
            } else {
                res.status(409).json({
                    success: false,
                    message: message
                })
            }
        }else{
            let secure_url=''
            const { success, message, updatedUser } = await updateUser({ userId, name, bio, location,secure_url })
            if (success) {
                res.status(200).json({
                    success: true,
                    message: 'updated successfully',
                    updatedUser
                })
            } else {
                res.status(409).json({
                    success: false,
                    message: message
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'unexpected error'
        })
    }
}


const getMessages=async(req:Request,res:Response)=>{
    try {
        const userId= req.params.id
        const recipientId=req.query.recipientId?.toString()
        if(recipientId && userId){
            console.log('caalling repo')
            const messages=await getChat(userId,recipientId)
            res.status(200).json({
                success: true,
                message: 'conversations retrieved successfully',
                data:messages
            })
        }
    } catch (error:any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export { editProfile,getMessages }