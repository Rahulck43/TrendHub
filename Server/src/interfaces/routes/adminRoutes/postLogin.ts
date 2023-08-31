import { Request, Response } from "express";
import { adminValidate } from "../../../useCases/admin/loginUseCase";
import { generateAdminToken } from "../../../adapters/auth/adminAuthUtils";






const postLoginRouter = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const isValid = adminValidate({ email, password })
        if (isValid.success) {
            const jwtToken =await generateAdminToken(isValid.admin)
            res.cookie('adminToken', jwtToken)
            res.status(200).json({
                success: true,
                message: 'admin login successful',
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'invalid email or password'
            })
        }
    } catch (error: any) {
        console.error(error.message)
        res.status(400).send({
            success: false,
            message: 'unexpected error at login'
        })
    }
}


export default postLoginRouter