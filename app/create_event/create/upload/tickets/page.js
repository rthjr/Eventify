"use client";

import Footer from '@components/Footer';
import Header from '@components/Header';
import React, { useState } from 'react';

const Tickets = () => {
    const [isPaid, setIsPaid] = useState(true);
    const [isFree, setIsFree] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPayment, setIsPayment] = useState(false)

    const handleStateChange = (type) => {
        setIsPaid(type === "paid");
        setIsFree(type === "free");
        setIsOpen(type === "open");
    };

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
                    <form action="" className='p-4 bg-gray-100 shadow-2xl rounded-lg w-full h-auto flex flex-col gap-8'>
                        <h2 className='text-2xl font-bold text-black'>Event Poster</h2>
                        <ul className='flex justify-between'>
                            <li>Basic Info</li>
                            <li>Upload Media</li>
                            <li className='border-b-2 border-customPurple-default text-customPurple-default text-lg font-bold'>Tickets</li>
                            <li>Payment Info</li>
                        </ul>

                        {/* ticket system */}
                        <div className='w-full p-4 border-2 border-black rounded-lg flex flex-col gap-8'>
                            <h2 className='text-xl font-bold text-center'>State the Event System</h2>

                            <div className='flex justify-around w-full'>
                                <button
                                    type="button"
                                    className={`rounded-lg ${isPaid ? 'bg-customPurple-hover' : 'bg-customPurple-default'} hover:bg-customPurple-hover text-white p-2`}
                                    onClick={() => handleStateChange("paid")}
                                >
                                    Paid
                                </button>
                                <button
                                    type="button"
                                    className={`rounded-lg ${isFree ? 'bg-customPurple-hover' : 'bg-customPurple-default'} hover:bg-customPurple-hover text-white p-2`}
                                    onClick={() => handleStateChange("free")}
                                >
                                    Free
                                </button>
                                <button
                                    type="button"
                                    className={`rounded-lg ${isOpen ? 'bg-customPurple-hover' : 'bg-customPurple-default'} hover:bg-customPurple-hover text-white p-2`}
                                    onClick={() => handleStateChange("open")}
                                >
                                    Open
                                </button>
                            </div>

                            {/* Conditional rendering */}
                            {isPaid && (
                                <div className="flex flex-col gap-8">
                                    <h2 className='text-xl font-bold text-start'>Type of event Regular, Early Bird, Last Event</h2>
                                    <div>
                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Event Tyoe">Event Type</label>
                                            <input type="text" placeholder='Event Type' className='p-2 bg-customPurple-default hover:bg-customPurple-hover rounded-lg text-white' />
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Amount of Attendee">Amount of Attendee</label>
                                            <input className='p-2 bg-customPurple-default hover:bg-customPurple-hover rounded-lg text-white' type="text" placeholder='Amount of attendee' />
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Tickets price">Tickets Price</label>
                                            <input className='p-2 bg-customPurple-default hover:bg-customPurple-hover rounded-lg text-white' type="text" placeholder='Ticket Price' />
                                        </div>

                                        <h2 className='text-xl font-bold text-start'>Cancellation Policy</h2>

                                        <p className='text-lg font-light'>
                                            Customize a refund policy for your event. You are responsible for you own policies. In some situation,you will be required to issue, regardless of your policy.
                                        </p>
                                    </div>
                                </div>
                            )}
                            {isFree && (
                                <div className="text-center">You selected Free</div>
                            )}
                            {isOpen && (
                                <div className="text-center">You selected Open</div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Tickets;
