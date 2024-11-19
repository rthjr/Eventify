"use client"

import Link from "@node_modules/next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "@node_modules/next/image";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { useState } from "react";

export default function Paid({ imageEvent, eventName, date, ticketEvent, typeEvent, location, eventQr }) {

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleRadioChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-8/12 flex justify-center items-center h-screen ">
                <div className=" flex h-fit shadow-lg p-8 rounded-lg">
                    {/* ui for the left side */}
                    <div className="w-1/2 h-full flex justify-center items-center p-3">
                        <div className="h-5/6">
                            <div>
                                <Link href="/">
                                    <IoMdArrowRoundBack
                                        size={24}
                                    />
                                </Link>
                                <h2 className="text-center font-bold text-lg mb-8">Checkout</h2>
                            </div>

                            <p className="mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam rerum autem porro quae inventore laboriosam totam et nisi. Repellendus ea aperiam dignissimos doloribus eos accusantium at, non ad minima aliquid!</p>

                            <form action="" className="mb-8">
                                <div className="flex justify-between">
                                    <div className="flex flex-col  mb-8">
                                        <label htmlFor="firstName" className="mb-4">First Name</label>
                                        <input type="text" required placeholder="First Name" className="p-2 text-black border-black border-2 rounded-lg" />
                                    </div>

                                    <div className="flex flex-col  mb-8">
                                        <label htmlFor="firstName" className="mb-4">Last Name</label>
                                        <input type="text" required placeholder="Last Name" className="p-2 text-black  border-black border-2 rounded-lg" />
                                    </div>
                                </div>


                                <div className="flex flex-col mb-8">
                                    <label htmlFor="firstName" className="mb-4">Email</label>
                                    <input type="text" required placeholder="Enter email here for notification" className="p-2 text-black border-black border-2 rounded-lg" />
                                </div>

                                <div>
                                    <h2 className="mb-4 text-black font-bold text-lg">Pay With</h2>
                                    <div className="flex flex-col border-2 border-black rounded-lg p-4 mb-4">
                                        <div className="mb-2 flex justify-between">
                                            <div className="flex gap-4">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="cash"
                                                    value="cash"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={handleRadioChange} />
                                                <label htmlFor="cash">By Cash</label>
                                            </div>
                                            <BsCashCoin
                                                size={24}
                                            />
                                        </div>

                                        <div className="w-full border-b border-black border-2"></div>

                                        <div className="mt-2 flex justify-between">
                                            <div className="flex gap-4">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="qr"
                                                    value="qr"
                                                    checked={paymentMethod === 'qr'}
                                                    onChange={handleRadioChange}
                                                />
                                                <label htmlFor="cash">By QR</label>
                                            </div>
                                            <MdOutlineQrCodeScanner
                                                size={24}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Conditionally render the QR scanner after selecting "By QR" */}
                                {paymentMethod === 'qr' && (
                                    <div className="mt-4">
                                        <h3 className="text-black font-bold text-lg mb-4">Scan QR Code to Pay</h3>

                                        {/* Add your QR scanner component or an image to simulate the scanner */}
                                        <div className="overflow-hidden relative w-36 h-36 mb-4 rounded-lg">
                                            <Image
                                                src={eventQr}
                                                alt={eventName}
                                                layout='fill'
                                                objectFit='cover'
                                            />
                                        </div>
                                    </div>
                                )}



                            </form>

                            <button className="rounded-lg bg-customPurple-default hover:bg-customPurple-hover text-white p-2 ">Register</button>
                        </div>
                    </div>

                    {/* ui for the right side */}
                    <div className="w-1/2 h-5/6 flex justify-center">
                        <div className="w-full flex flex-col p-3 border-l border-black">
                            <div className="overflow-hidden w-full h-72 mb-8 relative rounded-lg">
                                <Image
                                    src={imageEvent}
                                    alt={eventName}
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>

                            <span className="text-black mb-8">{typeEvent}</span>

                            <h2 className="text-xl font-bold text-black mb-8">{eventName}</h2>

                            <div className="mb-8">
                                <span>Date</span>
                                <span>{date}</span>F
                            </div>

                            <div>
                                <p className="text-black font-bold text-lg">Location</p>
                                <span>{location}</span>
                            </div>

                            <div className="mb-8 flex justify-between">
                                <p>Ticket</p>
                                <span>{ticketEvent}</span>
                            </div>

                            <div className=" flex justify-between">
                                <p>Total</p>
                                <span>$0.00</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}