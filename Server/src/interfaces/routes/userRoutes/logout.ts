import { Router,Response,Request} from "express";



const logoutRouter=(req:Request,res:Response)=>{
    try {
        res.clearCookie('jwtToken')
        res.status(200).json({
            success:true,
            message:'user logged out successfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'user logout failed'
        })
    }
}


export default logoutRouter