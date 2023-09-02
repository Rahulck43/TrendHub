import jwt from 'jsonwebtoken'
import 'dotenv'
import { NextFunction, Request, Response } from 'express'
const jwtKey = process.env.JWT_KEY || ''

interface DecodedToken {
    user_id: string;
    email: string
    // Add any other properties from your JWT payload here
}


const userAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwtToken
        if (token) {
            jwt.verify(token, jwtKey, (err: any, decode: any) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'token verification failed'
                    })
                } else {
                    next()
                }
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'token not found'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            message: 'unexpected error'
        })
    }
}

const decodeUser = async (token: string) => {
    try {
        const decodedToken = jwt.verify(token, jwtKey) as DecodedToken
        const userId = decodedToken?.user_id
        return userId

    } catch (error: any) {
        throw error(error)
    }
}

export default userAuth
export { decodeUser }

