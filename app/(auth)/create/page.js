"use client"

import Link from "@node_modules/next/link"
import {FaFacebookSquare} from "react-icons/fa";
import Image from "@node_modules/next/image"
import { useRouter } from "@node_modules/next/navigation";


export default function Create() {

    // router
    const router = useRouter();
    const goToRegister = () =>{
        router.push('/create/register');
    }

    const goBack = () => {
        router.push('/login')
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            <div className="hidden lg:flex w-full lg:w-6/12 justify-center items-center">
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
                    <h1 className="text-black font-bold text-center text-2xl md:text-3xl lg:text-4xl">Create Account</h1>
                    <div className="mt-10 flex flex-col justify-center w-9/12">
                        <form action="" className="flex flex-col mb-8">
                            <label htmlFor="email" className="mb-2 font-bold">
                                Email
                            </label>
                            <input className="border-2 p-2 rounded-xl border-black mb-6" type="email" required placeholder="Enter email here" />
                        </form>
                        <button className="p-3 border-none rounded-xl bg-customPurple-default hover:bg-customPurple-hover text-center text-white" onClick = {goToRegister}>Continue</button>
                        <div className="my-4 flex items-center justify-center text-black">
                            <div className="flex-1 border-b border-black mr-4"></div>
                            <span>OR</span>
                            <div className="flex-1 border-b border-black ml-4"></div>
                        </div>
                        <button className="p-3 bg-customPurple-default rounded-xl text-white border-none mb-4 hover:bg-customPurple-hover">
                            {/* icon */}
                            Phone Number
                        </button>
                        <span>Other login method</span>
                        <Link href="/">
                            <FaFacebookSquare
                                className="text-4xl"
                            />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}