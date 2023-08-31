import { Request, Response } from "express";
import { postLogin } from "../../../useCases/user/userLoginUseCase";
import { generateJwtToken } from "../../../adapters/auth/authUtils";

// const loginRouter = Router()


const loginRouter= async (req: Request, res: Response) => {
    try {
        const { userName, password }: { userName: string, password: string } = req.body;
        const userExist = await postLogin({ userName, password })
        if (userExist?.success) {
            const token = await generateJwtToken(userExist.user)
            res.cookie('jwtToken', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
            res.status(200).json({
                message: 'user login successful',
                success: true,
                user:userExist.user
            })
        } else {
            res.status(200).json({
                message: userExist?.message,
                success: false
            })
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

export default loginRouter