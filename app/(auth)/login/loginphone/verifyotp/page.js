"use client"

import Link from "@node_modules/next/link"
import { FaFacebookSquare } from "react-icons/fa";
import Image from "@node_modules/next/image"
import { useRouter } from "@node_modules/next/navigation";
import { useState } from "react";

export default function VerifyOTP() {

    // router
    const router = useRouter();

    const goBack = () => {
        router.push('/login/loginphone')
    }

    // State to hold OTP values
    const [otp, setOtp] = useState(new Array(5).fill(""));

    // Handle input change
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
            <div className="w-full lg:w-6/12 h-auto p-4 lg:p-10">
                <button className="border-none bg-customPurple-default text-white rounded-lg p-4 hover:bg-customPurple-hover mb-4 lg:mb-0" onClick={goBack}>Back</button>
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-black font-bold text-left text-2xl md:text-3xl lg:text-4xl w-9/12 ">
                        <h1>Verify</h1>
                        <h1>Phone Number</h1>
                    </h1>
                    <div className="mt-10 flex flex-col justify-center w-9/12">
                        <form action="" className="flex flex-col mb-8">
                            <label htmlFor="otp" className="mb-2 font-bold">
                                Enter OTP Code
                            </label>
                            <div className="flex space-x-2 justify-between">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        className="border-2 p-2 rounded-xl border-black text-center w-12"
                                        type="text"
                                        maxLength="1"
                                        value={data}
                                        onChange={e => handleChange(e.target, index)}
                                        onFocus={e => e.target.select()}
                                    />
                                ))}
                            </div>
                        </form>
                        <button className="p-3 border-none rounded-xl bg-customPurple-default hover:bg-customPurple-hover text-center text-white" >Continue</button>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex w-full lg:w-6/12 justify-center items-center">
                <Image
                    src="/assets/loginim/register.png"
                    alt="register image"
                    width={550}
                    height={50}
                />
            </div>
        </div>
    )
}