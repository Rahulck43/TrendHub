
const adminEmail= process.env.ADMIN_EMAIL
const adminPassword=process.env.ADMIN_PASSWORD

const adminValidate=({email,password}:{email:string,password:string})=>{
    try {
        if(email===adminEmail && password===adminPassword){
            return({
                success:true,
                message:'admin login successful',
                admin:{email}
            })
        }else{
            return({
                success:false,
                message:'incorrect email or password',
            })
        }
    } catch (error) {
        throw new Error('unexpected error at admin validation')
    }
}

export {adminValidate}