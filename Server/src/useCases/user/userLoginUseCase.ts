import { checkPassword } from "../../adapters/auth/authUtils";
import { findUserByEmail, findUserByMobile, findUserByUserName } from "../../adapters/repositories/userRepository"



const postLogin = async ({ userName, password }: ({ userName: string|number, password: string })) => {
    try {
        let user:any;
        user = await findUserByEmail(userName)
        if (!user.success) {
            user = await findUserByUserName(userName)
        }
        if (!user.success) {
            user = await findUserByMobile(userName)
        }
        if (!user.success||!user.user) {
            return ({
                status: false,
                message: "user not found"
            })
        }
        const passValidate=await checkPassword(password,user.user.password)
        if(passValidate){
            return{
                success:true,
                user:user.user,
                message:'user validated'
            }
        }else{
            return{
                success:false,
                message:'incorrect password'
            }
        }
    } catch (error:any) {
        console.error('postlogin error', error.message)
        return{
            success:false,
            message:error.message
        }
    }
}



export { postLogin }