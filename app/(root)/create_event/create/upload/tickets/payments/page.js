"use client"

import React from 'react'
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import { useState } from 'react'
import { useRouter } from '@node_modules/next/navigation'

import { MdOutlineQrCodeScanner } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";


const Payment = () => {
    const router = useRouter()
    const [isQR, setIsQR] = useState(false)
    const [isCash, setIsCash] = useState(false)
    const [imageSrc, setImageSrc] = useState(null)

    // update image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRender = (e) => {
        e.preventDefault()
        router.push("/create_event/finish")
    }

    return (
        <>
            <Header />

            <div
                className='w-full h-full flex flex-wrap m-auto '
                style={{
                    backgroundImage: 'url(/assets/banner/createEvent.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className='w-10/12 h-auto my-20 m-auto backdrop-blur-2xl opacity-70 flex flex-col lg:flex-wrap gap-8'>
                    <div action="" className='p-4 bg-gray-100 shadow-2xl rounded-lg w-full h-auto flex flex-col gap-8'>
                        <h2 className='text-2xl font-bold text-black'>Event Poster</h2>
                        <ul className='flex justify-between'>
                            <li>Basic Info</li>
                            <li>Upload Media</li>
                            <li>Tickets</li>
                            <li className='border-b-2 border-customPurple-default text-customPurple-default text-lg font-bold'>Payment Info</li>
                        </ul>

                        {/* ticket system */}
                        <div className='w-full p-4 border-2 border-black rounded-lg flex flex-col gap-8'>
                            <h2 className='text-xl font-bold text-start'>Please select your payment methods to be linked with this Event. Can be Both</h2>

                            <div className='flex justify-center items-center'>
                                <div className='flex flex-col gap-8 w-1/2 border-2 border-black p-2 rounded-lg'>
                                    <div className='flex flex-wrap justify-between'>
                                        <div className='flex flex-wrap gap-4' >
                                            <input type="checkbox"
                                                id='qr'
                                                name='qr'
                                                checked={isQR}
                                                onChange={() => {
                                                    setIsQR(!isQR);
                                                }}
                                            />
                                            <label htmlFor="qr">By QR</label>
                                        </div>

                                        <MdOutlineQrCodeScanner
                                            size={24}
                                        />
                                    </div>

                                    <div className='flex flex-wrap justify-between'>
                                        <div className='flex flex-wrap gap-4' >
                                            <input type="checkbox"
                                                id='cash'
                                                name='cash'
                                                checked={isCash}
                                                onChange={() => {
                                                    setIsCash(!isCash);
                                                }}
                                            />
                                            <label htmlFor="Cash">By Cash</label>
                                        </div>

                                        <BsCashCoin
                                            size={24}
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* condition for QR */}

                            {isQR && (
                                <div className='flex flex-col gap-8'>
                                    <h2 className='text-xl font-bold '>Upload QR</h2>

                                    <form action='' className='flex flex-col gap-8'>
                                        <input
                                            type="file"
                                            accept="image/*" // Limit to image files only
                                            onChange={handleImageChange} // Call handler on file select
                                        />
                                        <div
                                            className='w-48 h-48 border-dotted rounded-lg flex items-center justify-center bg-gray-100'
                                            style={{ overflow: 'hidden' }} // Optional: Ensures image doesn't overflow
                                        >
                                            {imageSrc ? (
                                                <img
                                                    src={imageSrc}
                                                    alt="QR Code Preview"
                                                    className="w-full h-full object-cover border-2 border-black p-2 rounded-lg"
                                                />
                                            ) : (
                                                <span className='text-gray-500'>No image selected</span>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className='w-full h-auto flex flex-wrap justify-end items-end'>
                                <button className='rounded-lg bg-customPurple-default hover:bg-customPurple-hover text-white p-2' onClick={handleRender}>
                                    Publish Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Payment