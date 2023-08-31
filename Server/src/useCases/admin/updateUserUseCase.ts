import { blockUser, unBlockUser } from "../../adapters/repositories/userRepository"
import { getAllusers } from "./allUsersUseCase"



const blockUserUseCase = async (id: string) => {
    try {
        const result = await blockUser(id)
        if (result) {
            const allUsers = await getAllusers()
            return allUsers
        } else return false
    } catch (error: any) {
        console.error(error.message)
        throw new Error('error in usecase')
    }
}

const unBlockUserUseCase = async (id: string) => {
    try {
        const result = await unBlockUser(id)
        if (result) {
            const allUsers = await getAllusers()
            return allUsers
        } else return false
    } catch (error: any) {
        console.error(error.message)
        throw new Error('error in usecase')
    }
}





export { blockUserUseCase, unBlockUserUseCase }