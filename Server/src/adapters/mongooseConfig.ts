import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGOOSE_URL || '' 


const dbConnection = () => {
    mongoose.connect(mongoUrl, {
    }).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((err) => {
        console.error('Mongoose connection error:', err);
    });

}



export default dbConnection
