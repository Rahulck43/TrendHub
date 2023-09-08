import messageModel from "../../entities/messageModel";
import { Message } from "../../entities/types";


const saveMessage=async (messageData:Message) => {
    if(!messageData){
        throw Error('message data not found')
    }
    const newMessage=new messageModel(messageData)
    await newMessage.save()
}

const getChat = async (user1: string, user2: string) => {
    try {
        if(!user1 || !user2) {
            throw Error('participants not found')
        }
        console.log(user1,user2)
        const messages = await messageModel.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },
            ],
        }).sort({ createdAt: 1 })
        return messages
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export{getChat,saveMessage}