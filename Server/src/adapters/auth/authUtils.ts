import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv'
const jwtKey = process.env.JWT_KEY || ''


const hashPassword = async (password: string) => {
    const hashedPass = await bcrypt.hash(password, 10)
    return hashedPass;
}

const generateJwtToken = (user: any) => {
    const token = jwt.sign(
        { user_id: user._id, email: user.email },
        jwtKey,
        {
            expiresIn: "2d",
        }
    )
    return token
}


const checkPassword = async (password: string, dbPassword: string) => {
    try {
        const isValid = await bcrypt.compare(password, dbPassword)
        if (isValid) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error('error while comparing password')
    }
}

export { hashPassword, generateJwtToken, checkPassword }



