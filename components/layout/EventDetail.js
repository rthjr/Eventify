"use client";
import Image from "@node_modules/next/image";
import { IoLocation } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "@node_modules/next/navigation";
import { useSession } from "@node_modules/next-auth/react";
import Button from "../Button/Button";
import BackButton from "../Button/BackButton";

const EventDetail = ({ ticket, imageEvent, eventName, date, creatorName, ticketEvent, typeEvent, location, bookOtp }) => {
    const { status } = useSession(); // Check session status
    const router = useRouter();

    const handleBookNow = () => {
        if (status === "unauthenticated") {
            // Redirect to login page if unauthenticated
            router.push("/login");
        } else {
            // Redirect to ticket route if authenticated
            router.push(`/${ticket}`);
        }
    };

    const handleBack = (e) => {
        e.preventDefault()
        router.push('/find_event')
    }

    return (
        <div className="w-full h-auto my-20 flex flex-col justify-center items-center">
            <div className="w-8/12 flex flex-col justify-center items-center">

                <div className="flex w-full justify-start mb-8">
                    <BackButton
                        onClick={handleBack}
                        param="Back"
                    />
                </div>

                <div className="w-full h-full flex flex-col">
                    <div className="w-auto h-[500px] overflow-hidden rounded-lg relative mb-8 -z-20 shadow-gray shadow-2xl">
                        <Image
                            src={imageEvent}
                            alt={eventName}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className="flex justify-between mb-12 w-full h-full ">
                        <h2 className="font-bold text-2xl">{eventName}</h2>

                        {bookOtp === "true" ? (
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-green-500">{ticketEvent}</p>

                                {/* Book button with authentication check */}
                                <button
                                    onClick={handleBookNow}
                                    className="p-3 bg-customPurple-default hover:bg-customPurple-hover transition-all text-white rounded-lg"
                                >
                                    Book
                                </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Type of Event</p>
                        <span className="font-semibold text-green-500">{typeEvent}</span>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Date and Time</p>
                        <span>{date}</span>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Location</p>
                        <div className="flex gap-4">
                            <IoLocation size={50} />
                            <span>{location}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Show Map</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.978511266007!2d104.94329991169158!3d11.481475538666379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310959f3e2eaeca3%3A0x837121df56bef030!2sTa%20Khmau%2C%20Krong%20Ta%20Khmau!5e0!3m2!1sen!2skh!4v1731726698814!5m2!1sen!2skh"
                            width="600"
                            height="400"
                            allowFullScreen
                            title="Event Location"
                        ></iframe>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">About Event</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit dicta soluta aliquam esse provident ipsam illum hic placeat tempora error iusto, quis delectus doloremque totam quam accusantium dolore ad sed?</p>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Refund</p>
                        <p>None</p>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Organized by</p>
                        <div className="p-4 flex flex-col gap-8 bg-slate-200 rounded-lg">
                            <div className="flex gap-4 items-center mb-4">
                                <RxAvatar size={50} />
                                <span>{creatorName}</span>
                            </div>
                            <div className="mb-4">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus deserunt non commodi pariatur ipsam!</p>
                            </div>
                            <div>
                                <p className="font-bold text-xl">Contact</p>
                                <span>email: organizer@example.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
