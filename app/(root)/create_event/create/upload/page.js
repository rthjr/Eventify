"use client"
import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import React, { useState } from 'react'
import Button from '@components/Button/Button'
import BackButton from '@components/Button/BackButton'

import { useRouter } from '@node_modules/next/navigation'
// icon
import { LuUpload } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";

const Uploadmage = () => {
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState(null);

    const handleNext = (e) => {
        e.preventDefault()
        router.push("/create_event/create/upload/tickets")
    }

    const handleBack = (event) => {
        event.preventDefault()
        router.push("/create_event/create")
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Header isMenu = "create"/>

            <div
                className='w-full h-full flex flex-wrap m-auto '
                style={{ backgroundImage: 'url(/assets/banner/createEvent.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className='w-10/12 h-auto my-20 m-auto backdrop-blur-2xl opacity-70 flex flex-col lg:flex-wrap gap-8 '>
                    <form className='p-4 bg-gray-100 shadow-2xl rounded-lg w-full h-auto flex flex-col gap-8'>
                        <h2 className='text-2xl font-bold text-black'>Event Poster</h2>
                        <ul className='flex justify-between'>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Basic Info</li>
                            <li className='border-b-2 border-customPurple-default text-customPurple-default font-bold text-sm md:text-base lg:text-lg xl:text-xl'>Upload Media</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Tickets</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Payment Info</li>
                        </ul>

                        {/* Upload and preview image */}
                        <div className='p-4 w-full h-auto border-black border-2 border-dotted rounded-lg flex flex-col gap-4 justify-center items-center'>
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="w-full h-auto max-h-64 object-cover rounded-md"
                                />
                            ) : (
                                <CiImageOn size={50} />
                            )}
                            <span className='font-light text-black text-lg'>
                                {selectedImage ? "Image Selected" : "Select an Image"}
                            </span>
                            <label
                                htmlFor="upload-input"
                                className='flex gap-2 rounded-lg bg-customPurple-default hover:bg-customPurple-hover text-white p-2 cursor-pointer'
                            >
                                <LuUpload size={24} />
                                Upload Media
                                <input
                                    id="upload-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        <div className='w-full h-auto flex items-end justify-between'>
                            <BackButton
                                onClick={handleBack}
                                param="Back"
                            />
                            <Button
                                onClick={handleNext}
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

export default Uploadmage;
