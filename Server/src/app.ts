import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dbConnection from './adapters/mongooseConfig'
import userRouter from './interfaces/routes/userRoutes'
import adminRouter from './interfaces/routes/adminRoutes'

const app=express()

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
app.listen(4000, ()=>{
    console.log('server listening on 4000');
})
dbConnection()


                                                                  