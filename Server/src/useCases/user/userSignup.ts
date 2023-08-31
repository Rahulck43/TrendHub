import bcrypt from 'bcrypt'
import { findUser, saveUser } from '../../adapters/repositories/userRepository'
import { hashPassword } from '../../adapters/auth/authUtils'




async function userSignup({ name, email, mobile, userName, password }: { name: string, email: string, mobile: number, userName: string, password: string }) {
    try {
        const userExist: any = await findUser(email,mobile,userName)
        if (userExist) {
            return ({
                success: false,
                message: `${userExist.field} already exist`,
            })
        } else if(userExist===null) {
            const hashedPass: any =await hashPassword(password);
            const newUser = await saveUser({ name, email, mobile, userName, hashedPass })
            return {
                success: true,
                user: newUser,
                message: 'user saved successfully'
            }
        }
    } catch (error:any) {
        console.error('Error occurred during user signup:', error.message);
        return {
            success:false,
            message:'unexpected error at userSignup'
        }
    }
}



export { userSignup }