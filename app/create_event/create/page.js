"use client"

import Footer from '@components/Footer'
import Header from '@components/Header'
import React from 'react'

import { useRouter } from '@node_modules/next/navigation'

const Create = () => {

    const router = useRouter()
    const handleRedirect = () => {
        router.push("/create_event/create/upload")
    }

    const handleBack = (event) => {
        event.preventDefault()
        router.push("/create_event")
    }

    return (
        <>
            <Header />
            
            <div
                className='w-full h-full flex flex-wrap m-auto '
                style={{ backgroundImage: 'url(/assets/banner/createEvent.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className='w-10/12 h-auto flex flex-wrap my-20 m-auto backdrop-blur-2xl opacity-70 '>
                    <form action="" className='p-4 bg-gray-100 shadow-2xl rounded-xl w-full h-auto flex flex-col gap-8'>

                        <h2 className='text-2xl font-bold text-black'>Create an Event</h2>

                        <ul className='flex justify-between'>
                            <li className='border-b-2 border-customPurple-default text-customPurple-default text-lg font-bold'>Basic Info</li>
                            <li>Upload Media</li>
                            <li>Tickets</li>
                            <li>Payment Info</li>
                        </ul>

                        <div className='flex flex-wrap lg:flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>What's the name of your Event?</h2>
                            <p>This will be your event's title. Your title will be used to help create your event's summary, description, category</p>
                        </div>

                        <dir className="flex flex-col gap-4">
                            <label htmlFor="event name" className='text-lg font-bold text-black'>Event Name</label>
                            <input type="text" className='w-full p-4 rounded-lg border-2 border-black' required placeholder='Enter name of Event' />
                        </dir>

                        <h2 className='text-2xl font-bold'>Schedule</h2>

                        <input type="date" required placeholder='select the date' className='p-4 border-2 border-black w-full rounded-lg' />

                        <div className='flex justify-between gap-4 w-full'>
                            <input type="time" className='w-full p-4 rounded-lg border-2 border-black' required />
                            <input type="time" className='w-full p-4 rounded-lg border-2 border-black' required />
                        </div>

                        <h2>Where is it Location?</h2>

                        <input type="url" placeholder='input the url map' className='w-full p-4 rounded-lg border-2 border-black' />

                        <textarea name="" id="" className='w-full p-4 rounded-lg border-2 border-black' placeholder='Write anything here'></textarea>

                        <div className='w-full flex justify-between items-end'>
                            <button className='rounded-lg bg-customPurple-default hover:bg-customPurple-hover text-white p-2' onClick={handleBack}>Back</button>
                            <button
                                onClick={handleRedirect}
                                className='p-2 bg-customPurple-default text-white text-lg font-bold hover:bg-customPurple-hover rounded-lg transition-all'
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Create
