import userModel from "../../entities/userModel"



const findAllUsers = async () => {
    try {
        const allUsers = await userModel.find()
        if (allUsers) {
            return allUsers
        } else {
            return false
        }
    } catch (error) {
        throw new Error('error fetching all users')
    }
}



export{findAllUsers}