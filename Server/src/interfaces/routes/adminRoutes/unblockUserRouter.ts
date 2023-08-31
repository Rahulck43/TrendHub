import { Request, Response } from "express";
import { unBlockUserUseCase } from "../../../useCases/admin/updateUserUseCase";




const unblockUserRouter = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        const updatedUsers = await unBlockUserUseCase(userId)
        if (updatedUsers) {
            res.status(200).json({
                success: true,
                message: 'updated usesrlist returned successfully',
                updatedUsers
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'error at interface',
            })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({
            success: false,
            message: 'unexpected error',
        })
    }
}



export default unblockUserRouter