import { Request, Response } from "express";
import { getAllusers } from "../../../useCases/admin/allUsersUseCase";



const getAllUsersRouter = async (req: Request, res: Response) => {
    try {
        const allUsers = await getAllusers()
        if(allUsers){
            res.status(200).json({
                success:true,
                message:'all users fetched successfully',
                allUsers:allUsers
            })
        }else{
            res.status(200).json({
                success:false,
                message:'error fetching users list',
            })
        }
    } catch (error:any) {
        console.error(error.message)
        res.status(400).send({
            success:false,
            message:'unexpeccted error while fetching usesrs list'
        })
    }
}


export default getAllUsersRouter