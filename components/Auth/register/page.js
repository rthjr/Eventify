"use client"

import Image from "next/image";
import { useRouter } from "@node_modules/next/navigation";
import { useState } from "react";
import Loading from "@app/(root)/loading";
import { FaRegCheckCircle } from "react-icons/fa";

import { getProviders, signIn } from "next-auth/react";

import { FaGoogle } from "react-icons/fa";

import { FaFacebookSquare } from "react-icons/fa";

import { RxCrossCircled } from "react-icons/rx";
import { useEffect } from "react";

export default function Register() {

    const [firstName, setFirstName] = useState('')

    const [providers, setProviders] = useState(null);
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('')
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !password) {
            setError("forms should not be empty")
            return
        }


        try {

            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            })

            const { user } = await resUserExists.json()
            if (user) {
                setError(" ")

                setIsLoading(false);
                return
            }



            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, firstName, lastName, password })
            })



            const data = res.json()
            if (res.ok) {
                e.target.reset()
                setTimeout(() => {
                    setIsLoading(false);
                    setIsSuccess(true);
                    setTimeout(() => {
                        router.push("/login")
                    }, 2000);
                }, 2000);


                router.refresh()
            } else {


                setError(data.message || "registration fail")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // use to router page
    const currentPath = router.pathname;

    const goBack = () => {
        const targetPath = currentPath === '/' ? '/login' : '/';
        if (currentPath === '/') {
            router.push(targetPath);
        } else {
            router.back()
        }

    };

    const handleCancel = () => {
        setError(""); // Clear the error message
    };


    // login with facebook google
    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        fetchProviders();
    }, []);

    //handle facebook
    const handleSignInFacebook = async () => {
        await signIn('facebook', { callbackUrl: '/' })
    }

    //handle google sign in 
    const handleSignInGoogle = async () => {
        await signIn('google', { callbackUrl: '/' })
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
                <button className="border-none bg-customPurple-default text-white rounded-lg p-4 hover:bg-customPurple-hover mb-4 lg:mb-0" onClick={goBack}>Back</button>

                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-black font-bold text-center text-2xl md:text-3xl lg:text-4xl ">Create Account</h1>
                    <div className="w-full lg:w-4/5 mt-10">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2">Email</label>
                                <input type="email" className="mb-2 border-black rounded-lg border-2 p-2" required placeholder="Enter email here" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-6">
                                <div className="flex flex-col w-full">
                                    <label className="mb-2" htmlFor="firstName">Firstname</label>
                                    <input type="text" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="Enter name" onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="lastName" className="mb-2">Lastname</label>
                                    <input type="text" className="mb-2 border-black rounded-lg border-2 p-2" required placeholder="Enter name" onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="password" className="mb-2">Password</label>
                                <input type="password" className="mb-2 border-black rounded-lg border-2 p-2" placeholder="enter password here" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="flex justify-between mt-4">
                                <div></div>
                                <button className="p-2 bg-customPurple-default hover:bg-customPurple-hover text-white border-none rounded-lg" >Submit</button>
                            </div>
                        </form>
                        <span className="text-center">Other login method</span>
                        {/* add other method with facebook and google */}
                        <div className="w-full flex  justify-center items-center">
                            <div className="flex gap-4 mt-4">
                                {providers && providers.facebook && (
                                    <div>

                                        <button onClick={handleSignInFacebook} >
                                            <FaFacebookSquare className="text-4xl" />
                                        </button>

                                    </div>
                                )}
                                {providers && providers.google && (
                                    <div>
                                        <button onClick={handleSignInGoogle}>
                                            <FaGoogle className="text-4xl" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {error && (
                            <div>
                                <h2>{error}</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="absolute top-0 h-full w-full z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white shadow-lg w-fit text-white rounded-md  z-50">
                        <Loading wh="w-12 h-12" />
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute top-0 h-full w-full z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white shadow-lg w-fit text-white text-sm py-1 px-3 rounded-md mt-2 z-50">
                        {/* error form habling */}
                        <div className=" lg:w-96 lg:h-96 text-white text-sm py-2 px-4 rounded-md flex flex-col items-center justify-center">
                            <RxCrossCircled size={100} color="red" />
                            <span className="my-5 text-black">Email already exist!</span>
                            <button
                                onClick={handleCancel}
                                className="mt-2 bg-white text-black py-1 p-3 border-2 border-black rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isSuccess && (
                <div className="absolute top-0 h-full w-full z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white shadow-lg w-fit text-white text-sm py-1 px-3 rounded-md mt-2 z-50">
                        <div className="lg:w-96 lg:h-96 text-white text-sm py-2 px-4 rounded-md flex flex-col items-center justify-center">
                            <FaRegCheckCircle size={100} color="green" />
                            <span className="my-5 text-black">Login Successful!</span>
                            <button
                                onClick={handleCancel}
                                className="mt-2 bg-white text-black py-1 p-3 border-2 border-black rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}