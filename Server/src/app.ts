import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {Server, Socket} from 'socket.io'
import {createServer} from 'http'
import { configureSocketIo } from './adapters/utils/socketIo'
import dbConnection from './adapters/mongooseConfig'
import userRouter from './interfaces/routes/userRoutes'
import adminRouter from './interfaces/routes/adminRoutes'
const port= process.env.PORT || 4000

const app=express()
const server= createServer(app)
const io=new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
      credentials: true,
    },
  })

  

app.use(cors({
    origin:['http://localhost:3000','http://localhost:3001','http://localhost:5173'],
    credentials : true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/', userRouter)
app.use('/admin',adminRouter)

server.listen(port, ()=>{
    console.log(`server listening on ${port} `);
})
dbConnection()
configureSocketIo(io)


                                                                  