import {  Request, Response } from "express";
import { userSignup } from "../../../useCases/user/userSignup";
import { generateJwtToken } from "../../../adapters/auth/authUtils";


const signupRouter=  async (req: Request, res: Response) => {
    try {
        const { name, email, mobile, userName, password }: { name: string; email: string; mobile: number; userName: string; password: string; } = req.body;
        const signupResult = await userSignup({ name, email, mobile, userName, password });
        if (signupResult?.success) {
            const jwtToken = await generateJwtToken(signupResult.user)
            res.cookie('jwtToken', jwtToken, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
            res.status(200).json({
                message: "User signed up successfully!",
                success: true,
                user: signupResult.user
            });
        } else {
            res.status(200).json({
                message: signupResult?.message,
                success: false
            })
        }
    } catch (error: any) {
        console.error('error occured at signupRoute', error.message)
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
};

export default signupRouter

















// use refresh token to regenerate token in short lifespan so that user dont need to login freequently and security