"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@components/Button/Button";
import Error404 from "../404";
import { IoMdArrowRoundBack } from "@node_modules/react-icons/io";
import { MdOutlineQrCodeScanner } from "@node_modules/react-icons/md";
import { BsCashCoin } from "@node_modules/react-icons/bs";
import { useRouter } from "next/navigation";

import Image from "@node_modules/next/image";

export default function TicketType({ params }) {
    const router = useRouter()
    const { ticket } = params; // Extract ticket from params
    const [paymentMethod, setPaymentMethod] = useState('');
    const [event, setEvent] = useState(() => {
        // Initialize event from localStorage if available
        const storedEvent = localStorage.getItem("currentEvent");
        return storedEvent ? JSON.parse(storedEvent) : null;
    });
    const handleRadioChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const searchParams = useSearchParams();
    const pageEvent = searchParams.get("pageEvent"); // Extract pageEvent
    const eventId = Number(ticket); // Convert ticket to a number

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `https://coding-fairy.com/api/mock-api-resources/1734491523/eventify/${eventId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch event data.");
                }
                const data = await response.json();
                setEvent(data);

                // Store the fetched data in localStorage
                localStorage.setItem("currentEvent", JSON.stringify(data));
            } catch (error) {
                console.error(error.message);
            }
        }

        // Fetch data only if no event exists or eventId changes
        if (!event || event.id !== eventId) {
            fetchData();
        }
    }, [eventId, event]);

    // Handle case where event data is not yet available
    if (!event) {
        return <div>Loading...</div>;
    }

    // Handle case where event is invalid or not found
    if (Object.keys(event).length === 0) {
        return <Error404 />;
    }

    const handleBackClick = () => {
        router.back(); // This will navigate to the previous page in the browser history
    };

    // Match the pageEvent to determine which component to render
    return (
        <div className="w-full flex flex-col justify-center items-center px-4 sm:px-8">
            <div className="w-full max-w-5xl flex justify-center items-center h-auto">
                <div className="flex flex-col lg:flex-row w-full rounded-lg overflow-hidden gap-4 ">
                    {/* left Side */}
                    <div className="w-full lg:w-1/2 h-fit flex justify-center p-4 border-2 rounded-lg border-black">
                        <div className="w-full flex flex-col">
                            <div className="overflow-hidden w-full h-64 mb-8 relative rounded-lg">
                                <Image
                                    src={event.imageUrl}
                                    alt={event.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-black mb-8">{event.name}</h2>
                            <div className="mb-8">
                                <span>Date: </span>
                                <span>{event.date}</span>
                            </div>
                            <div>
                                <p className="text-black font-bold text-lg">Location</p>
                                <span>{event.location}</span>
                            </div>
                            <div className="mb-8 flex justify-between">
                                <p>Ticket</p>
                                <span>{event.ticketType}</span>
                            </div>
                            <div className="flex justify-between">
                                <p>Total</p>
                                <span>${event.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* right Side */}
                    <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-4 border-2 rounded-lg border-black">
                        <div className="w-full">
                            <div className="mb-8">
                                <div className="w-fit h-fit">
                                    <Button
                                        onClick={handleBackClick}
                                        param={
                                            <IoMdArrowRoundBack size={24} className="cursor-pointer" />}
                                    />
                                </div>
                                <h2 className="text-center font-bold text-lg">Checkout</h2>
                            </div>

                            <p className="mb-8 text-sm sm:text-base">
                                {event.description}
                            </p>

                            <form className="mb-8">
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className="flex flex-col w-full sm:w-1/2">
                                        <label htmlFor="firstName" className="mb-2">First Name</label>
                                        <input type="text" required placeholder="First Name" className="p-2 text-black border-black border-2 rounded-lg" />
                                    </div>
                                    <div className="flex flex-col w-full sm:w-1/2">
                                        <label htmlFor="lastName" className="mb-2">Last Name</label>
                                        <input type="text" required placeholder="Last Name" className="p-2 text-black border-black border-2 rounded-lg" />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-8">
                                    <label htmlFor="email" className="mb-2">Email</label>
                                    <input type="text" required placeholder="Enter email for notification" className="p-2 text-black border-black border-2 rounded-lg" />
                                </div>

                                <div>
                                    <h2 className="mb-4 text-black font-bold text-lg">Pay With</h2>
                                    <div className="flex flex-col border-2 border-black rounded-lg p-4 mb-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="cash"
                                                    value="cash"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={handleRadioChange}
                                                />
                                                <label htmlFor="cash">By Cash</label>
                                            </div>
                                            <BsCashCoin size={24} />
                                        </div>
                                        <div className="w-full border-t border-black mb-4"></div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="qr"
                                                    value="qr"
                                                    checked={paymentMethod === 'qr'}
                                                    onChange={handleRadioChange}
                                                />
                                                <label htmlFor="qr">By QR</label>
                                            </div>
                                            <MdOutlineQrCodeScanner size={24} />
                                        </div>
                                    </div>
                                </div>

                                {paymentMethod === 'qr' && (
                                    <div className="mt-4">
                                        <h3 className="text-black font-bold text-lg mb-4">Scan QR Code to Pay</h3>
                                        <div className="overflow-hidden relative w-36 h-36 mx-auto rounded-lg">
                                            <Image
                                                src={qrUrl}
                                                alt={event.name}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </form>

                            <Button
                                param="Register"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
