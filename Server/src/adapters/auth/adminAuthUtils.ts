import jwt from 'jsonwebtoken'
import 'dotenv'


const jwtKey = process.env.JWT_KEY || ''

const generateAdminToken = async(admin: any) => {
    try {
        const token =await jwt.sign(
            { email: admin.email },
            jwtKey,
            {
                expiresIn: "2d",
            }
        )
        if (token) {
            return token
        } else return false
    } catch (error) {
        throw new Error('error while generating token')
    }
}


export{generateAdminToken}