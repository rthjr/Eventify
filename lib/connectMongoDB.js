import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("database is connected : ", connect.connection.name)
    } catch(error) {
        console.log(error)
    }
}