import jwt from 'jsonwebtoken'
import 'dotenv'
import { NextFunction, Request, Response } from 'express'

const jwtKey = process.env.JWT_KEY || ''


const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.adminToken
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


export default adminAuth



