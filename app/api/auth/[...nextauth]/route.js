import NextAuth from "next-auth";
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials";
import { connectMongoDB } from "@lib/connectMongoDB";
import User from "@model/user";
import dotenv from 'dotenv'
dotenv.config()

//build music on telegram so you don't have to pay spotify or youtube

export const authOptions = {
    providers : [
        Credentials({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const { email, password } = credentials
                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })
                    if(!user){
                        console.log("user not found")
                        return null
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    //compare password to entered email
                    if(!passwordMatch){
                        console.log("Wrong Password")
                        return null
                    }
                    return user
                }  catch (error){
                    //error debugging
                    console.log(error)
                }
            }
        })
    ],
    sessions: {
        strategy: "jwt"
    }, 
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session({ session, token }){
            if(token){
                session.user.id = token.sub
                session.user.firstName = token.firstName
                session.user.lastName = token.lastName
            }
            return session
        },
        async jwt({token, user}){
            if(user){
                token.firstName = user.firstName
                token.lastName = user.lastName
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}