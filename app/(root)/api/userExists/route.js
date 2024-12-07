import { connectMongoDB } from "@lib/connectMongoDB";
import User from "@model/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectMongoDB()  //promise function request to connect database
        const { email } = await req.json() //destructure email
        const user = await User.findOne({ email }).select("_id") //look for existing email
        return NextResponse.json({user}) // response back with user as json
    } catch (error){
        console.log(error)
    }
}