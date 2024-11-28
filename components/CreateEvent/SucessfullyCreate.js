
"use client"
import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from '@node_modules/next/navigation';

const SucessfullyCreate = () => {
    const router = useRouter()

    const handleRouter = (event) => {
        event.preventDefault()
        router.push("/")
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-300'>
            <div className='p-12 bg-white shadow-xl rounded-lg flex flex-col gap-8 items-center justify-center'>
                <FaRegCheckCircle size={100} color='green' />
                <div className='w-full h-auto flex flex-wrap justify-between gap-12'>
                    <button className='bg-customPurple-default hover:bg-customPurple-hover rounded-lg p-2 text-white'>
                        View Event
                    </button>
                    <button onClick={handleRouter} className='bg-customPurple-default hover:bg-customPurple-hover rounded-lg p-2 text-white'>
                        Finish
                    </button>
                </div>
            </div>
        </div>

    )
}

export default SucessfullyCreate