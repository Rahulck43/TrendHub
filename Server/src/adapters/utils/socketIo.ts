import { Server, Socket } from 'socket.io'
import { getChat, saveMessage } from '../repositories/messageRepository'


const configureSocketIo = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected')
        console.log(socket.id)
        socket.on('sendMessage',async (messageData) => {
            console.log('new message', messageData)
            await saveMessage(messageData)
            io.emit('sendMessage',messageData.message)
        })
    })
    io.on('disconnect', (socket: Socket) => {
        console.log('user disconnected')
    })

    io.on('sendMessage', (socket: Socket) => {
        console.log('a user connected', socket)
    })
}



export { configureSocketIo }

