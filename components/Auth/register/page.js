"use client"

import Image from "next/image";
import { useRouter } from "@node_modules/next/navigation";
import { useState } from "react";

export default function Register() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!firstName || !lastName || !email || !password){
            setError("forms should not be empty")
            return
        }


        try {

            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            })

            const { user } = await resUserExists.json()
            if(user){
                setError("email already exists")
                return
            }



            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({email, firstName, lastName, password})
            })
            


            const data = res.json()
            if(res.ok){
                e.target.reset()
                router.push("/login")
                router.refresh()
            } else {

                
                setError(data.message || "registration fail")
            }
        } catch(error){
            console.log(error)
        }
    }

    // use to router page
    
    
    const goBack = () => {
      router.push('/login')
    }
    

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
            <div className="hidden lg:flex w-full lg:w-6/12 justify-center items-center bg-customPurple-default">
                <Image
                    src="/assets/loginim/register.png"
                    alt="register image"
                    width={550}
                    height={50}
                />
            </div>

            <div className="w-full lg:w-6/12 h-auto p-4 lg:p-10">
                <button className="border-none bg-customPurple-default text-white rounded-lg p-4 hover:bg-customPurple-hover mb-4 lg:mb-0" onClick = {goBack}>Back</button>

                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-black font-bold text-center text-2xl md:text-3xl lg:text-4xl ">Create Account</h1>
                    <div className="w-full lg:w-4/5 mt-10">
                    <form onSubmit={handleSubmit}>
                        <form  className="flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input type="email" className="mb-2 border-black rounded-lg border-2 p-2" required placeholder="Enter email here" onChange={(e) => setEmail(e.target.value)}/>
                        </form>
                        <form action="" className="flex flex-col md:flex-row justify-between gap-0 md:gap-6">
                            <div className="flex flex-col w-full">
                                <label className="mb-2" htmlFor="firstName">Firstname</label>
                                <input type="text" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="Enter name" onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="lastName" className="mb-2">Lastname</label>
                                <input type="text" className="mb-2 border-black rounded-lg border-2 p-2" required placeholder="Enter name" onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                        </form>

                        <form action="" className="flex flex-col">
                            <label htmlFor="password" className="mb-2">Password</label>
                            <input type="password" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="enter password here" required onChange={(e) => setPassword(e.target.value)}/>
                        </form>
                        <div className="flex justify-between mt-4">
                            <div></div>
                            <button className="p-2 bg-customPurple-default hover:bg-customPurple-hover text-white border-none rounded-lg" >Submit</button>
                        </div>
                        </form>
                        {error && (
            <div>
                <h2>{error}</h2>
            </div>
         )}
                    </div>
                </div>
            </div>
        </div>
    );
}