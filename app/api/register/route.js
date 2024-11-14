import { connectMongoDB } from '@lib/connectMongoDB'
import User from '@model/user'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { email, firstName, lastName , password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB()
        await User.create({email, firstName, lastName, password: hashedPassword})
        return NextResponse.json({message: "User registered"}, {status: 201})
    } catch(error){
        return NextResponse.json({message: "an error occurred "}, {status: 500 })
    }
}