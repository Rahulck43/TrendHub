import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { io } from 'socket.io-client/debug'
import apiInstance from '../utils/apiInstance'

const ChatBox = () => {
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')
    const [messageList, setMessageList]=useState([])
    const { userId } = useSelector((store) => store?.user)
    const { id } = useParams()


    const handleSendMessage = async () => {
        console.log('before emit')
        const messageData = {
            sender: userId,
            recipient: id,
            message
        }
        await socket?.emit('sendMessage', messageData)
        setMessage('')
    }
    const fetchMessages=async()=>{
        const result = await apiInstance.get(`/users/messages/${userId}`, { params: { recipientId: id } });
        console.log(result.data.data)
        setMessageList(result.data.data)
    }

    useEffect(() => {
        const newSocket = io('http://localhost:4000');
        setSocket(newSocket)
        newSocket.on('sendMessage',(message)=>{
            console.log('message from server:',message)
            const newMessage= {sender:userId,recipientId:id,message}
        //    setMessageList([...messageList,newMessage])
            setMessageList((prevMessages) => [...prevMessages, newMessage])
        })
        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [])
    useEffect(() => {
        fetchMessages()
    }, [])

    return (
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                        {messageList.map((message)=>(
                        
                        <div key={message._id} className={message.sender===userId ? "col-start-1 col-end-8 p-3 rounded-lg":"col-start-6 col-end-13 p-3 rounded-lg"}>
                            <div className={message.sender===userId ? "flex flex-row items-center": "flex items-center justify-start flex-row-reverse"}>
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    A
                                </div>
                                <div className={message.sender===userId ?"relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl":"relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl" }>
                                    <div>{message.message}</div>
                                </div>
                            </div>
                        </div>
                        ))}
                        


                        
                    </div>
                </div>
            </div>
            <div
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
                <div>
                    <button
                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            type="text"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button
                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="ml-4">
                    <button onClick={handleSendMessage}
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                        <span >Send</span>
                        <span className="ml-2">
                            <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatBox