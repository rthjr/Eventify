"use client";

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import React, { useState } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import Button from '@components/Button/Button';
import BackButton from '@components/Button/BackButton';

const Tickets = () => {
    const router = useRouter()

    const [isPaid, setIsPaid] = useState(true);
    const [isFree, setIsFree] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isRefund, setIsRefund] = useState(false);
    const [noRefund, setNoRefund] = useState(false);

    const handleStateChange = (type) => {
        setIsPaid(type === "paid");
        setIsFree(type === "free");
        setIsOpen(type === "open");
        setIsRefund(type === "refund");
        setNoRefund(type === "noRefund");
    };

    const handleBack = (event) => {
        event.preventDefault()
        router.push("/create_event/create/upload")
    }

    const handleRouter = (e) => {
        e.preventDefault()
        router.push("/create_event/create/upload/tickets/payments")
    }

    // button
    const displayButton = () => {
        return (
            <div className='w-full h-auto flex flex-wrap justify-between'>
                <BackButton
                    onClick={handleBack}
                    param="Back"
                />

                <Button
                    onClick={handleRouter}
                    param="Save & Continue"
                />
            </div>
        )
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
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Basic Info</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Upload Media</li>
                            <li className='border-b-2 border-customPurple-default text-customPurple-default text-sm md:text-base lg:text-lg xl:text-xl font-bold'>Tickets</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Payment Info</li>
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
                                <form className="flex flex-col gap-8">
                                    <h2 className='text-xl font-bold text-start'>Type of event Regular, Early Bird, Last Event</h2>
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Event Tyoe">Event Type</label>
                                            <input type="text" placeholder='Event Type' className='p-2 border-black border-2 rounded-lg text-white' />
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Amount of Attendee">Amount of Attendee</label>
                                            <input className='p-2 border-black border-2 rounded-lg text-white' type="text" placeholder='Amount of attendee' />
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Tickets price">Tickets Price</label>
                                            <input className='p-2 border-black border-2 rounded-lg text-white' type="text" placeholder='Ticket Price' />
                                        </div>

                                        <h2 className='text-xl font-bold text-start'>Cancellation Policy</h2>

                                        <p className='text-sm font-light'>
                                            Customize a refund policy for your event. You are responsible for you own policies. In some situation,you will be required to issue, regardless of your policy.
                                        </p>

                                        <h2 className='text-xl font-bold text-start'>Set your refund policy</h2>

                                        <div className='flex flex-col gap-8'>
                                            <div className='flex gap-4'>
                                                <input
                                                    type="checkbox"
                                                    id='refund'
                                                    name='policy'
                                                    // Use controlled input
                                                    checked={isRefund}
                                                    onChange={() => {
                                                        setIsRefund(true);
                                                        setNoRefund(false);
                                                    }}
                                                />
                                                <label htmlFor="refund">Allow to refund</label>
                                            </div>

                                            <div className='flex gap-4'>
                                                <input
                                                    type="checkbox"
                                                    id='noRefund'
                                                    name='policy'
                                                    // Use controlled input
                                                    checked={noRefund}
                                                    onChange={() => {
                                                        setIsRefund(false);
                                                        setNoRefund(true);
                                                    }}
                                                />
                                                <label htmlFor="noRefund">Don't allow refund</label>
                                            </div>
                                        </div>

                                    </div>

                                    {isRefund && (
                                        <span>24 hours after the event give be refunded is 80%.</span>
                                    )}

                                    {noRefund && (
                                        <span>Cannot be refunded.</span>
                                    )}

                                    {displayButton()}
                                </form>
                            )}
                            {isFree && (
                                <form className="flex flex-col gap-8">
                                    <h2 className='text-xl font-bold text-start'>Type of event Regular, Early Bird, Last Event</h2>
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Event Tyoe">Event Type</label>
                                            <input type="text" placeholder='Event Type' className='p-2 border-2 border-black rounded-lg text-white' />
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Amount of Attendee">Amount of Attendee</label>
                                            <input className='p-2 border-2 border-black rounded-lg text-white' type="text" placeholder='Amount of attendee' />
                                        </div>
                                    </div>

                                    {displayButton()}
                                </form>
                            )}
                            {isOpen && (
                                <form action="" className="flex flex-col gap-8">
                                    <h2 className='text-xl font-bold text-start'>Type of event Regular, Early Bird, Last Event</h2>
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Event Tyoe">Event Type</label>
                                            <input type="text" placeholder='Event Type' className='p-2 border-2 border-black rounded-lg text-white' />
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            <label htmlFor="Amount of Attendee">Amount of Attendee</label>
                                            <input className='p-2 border-2 border-black rounded-lg text-white' type="text" placeholder='Amount of attendee' />
                                        </div>
                                    </div>


                                    {displayButton()}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Tickets;
