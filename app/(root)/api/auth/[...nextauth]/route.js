import NextAuth from "next-auth";
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials";
import { connectMongoDB } from "@lib/connectMongoDB";
import User from "@model/user";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google"
import dotenv from 'dotenv'
import { signIn } from "@node_modules/next-auth/react";
dotenv.config()


export const authOptions = {
    providers : [
        Credentials({
            id: "emailCredentials",
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
        }),
        Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        Credentials({
            id: "phoneCredentials",
            name: "phone-otp",
            credentials: {
                phone: { label: "Phone", type: "text" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials){

                console.log("phone credentials")
                const { phone, otp } = credentials

                const fixedOtp = "123456"
                const fixedPhone = "0123456789"
                
                if(phone === fixedPhone && otp === fixedOtp){
                    console.log("OTP and phone match, returning user object.");
                    return { id: 2, firstName: "User", lastName: "PhoneNumber", phoneAuthenticated: true, phone: fixedPhone ,role: 'user'}
                }

                throw new Error("Invalid phone number or OTP ")
            }
        })
    ],
    sessions: {
        strategy: "jwt"
    }, 
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signIn: "/login/loginwithphone",
    },
    callbacks: {

        //return back what type of session user are authenticating 
        async session({ session, token }){
            if(token){
                session.user = session.user || {}
                session.user.id = token.sub
                session.user.firstName = token.firstName || "Guess"
                session.user.lastName = token.lastName || "User"
                session.user.role = token.role
                session.user.phoneAuthenticated = token.phoneAuthenticated || false;
                session.user.phone = token.phone
            }
            return session
        },
        async jwt({token, user}){
            if(user){
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.role = user.role
                token.phoneAuthenticated = user.phoneAuthenticated || false
                token.phone = user.phone
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}