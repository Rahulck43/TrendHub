import { findAllUsers } from "../../adapters/repositories/allUsersRepository"


const getAllusers = async () => {
    try {
        const allUsers = await findAllUsers()
        if (allUsers) {
            return allUsers
        } else {
            return false
        }
    } catch (error:any) {
        console.error(error.message)
        throw new Error('error at getting all users')
    }
}


export { getAllusers }