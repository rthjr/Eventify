"use client"

import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import React from 'react'

import { useRouter } from '@node_modules/next/navigation'
import Input from '@components/InputButton/Input'
import Button from '@components/Button/Button'
import BackButton from '@components/Button/BackButton'

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

                        <Input
                            name="Event Name"
                            type="text"
                        />

                        <h2 className='text-2xl font-bold'>Schedule</h2>

                        <Input
                            name="Date"
                            type="date"
                        />

                        <div className='flex justify-between gap-4 w-full'>
                            <Input
                                name="Start Time"
                                type="time"
                            />


                            <Input
                                name="End Time"
                                type="time"
                            />
                        </div>

                        <Input
                            name="Where is it Location?"
                            type="url"
                        />

                        <Input
                            name="Description"
                            textArea="textArea"
                        />

                        <div className='w-full flex justify-between items-end'>
                            <BackButton
                                param="Back"
                            />

                            <Button
                                onClick={handleRedirect}
                                param="Save & Continue"
                            />
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Create
