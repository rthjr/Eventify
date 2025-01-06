"use client";
import Image from "@node_modules/next/image";
import { IoLocation } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "@node_modules/next/navigation";
import { useSession } from "@node_modules/next-auth/react";
import BackButton from "@components/Button/BackButton";
import Link from "@node_modules/next/link";
import Button from "@components/Button/Button";

const EventDetail = ({ ticket, bookOtp, pageEvent, blockButton, imageUrl, name, date, eventType, location, description, refund, ticketType }) => {
    const { status } = useSession(); // Check session status
    const router = useRouter();

    const handleBookNow = () => {
        if (status === "unauthenticated") {
            // Redirect to login page if unauthenticated
            router.push("/login");
        } else {

            return (
                <Link href={`/${ticket}?pageEvent=${pageEvent}`}>
                    <Button param="Book" />
                </Link>
            )
        }
    };

    const handleBack = (e) => {
        e.preventDefault()
        router.back()
    }

    return (
        <div className="w-full h-auto my-20 flex flex-col justify-center items-center">
            <div className="w-8/12 flex flex-col justify-center items-center">

                {blockButton !== "true" && (
                    <div className="flex w-full justify-between mb-8">
                        <BackButton
                            onClick={handleBack}
                            param="Back"
                        />
                    </div>
                )}

                <div className="w-full h-full flex flex-col">
                    <div className="w-auto h-[500px] overflow-hidden rounded-lg relative mb-8 z-20 shadow-gray shadow-2xl">
                        <Image
                            src={imageUrl}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    <div className="flex justify-between mb-12 w-full h-full ">
                        <h2 className="font-bold text-2xl">{name}</h2>

                        {bookOtp === "true" ? (
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-green-500">{ticketType}</p>

                                {/* Book button with authentication check */}
                                {handleBookNow()}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Type of Event</p>
                        <span className="font-semibold text-green-500">{eventType}</span>
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
                        <p className="font-bold text-xl">About Event</p>
                        <p>{description}</p>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Refund</p>
                        <div>
                            {ticketType === "paid" && refund === null
                                ? (
                                    <>
                                        <div className="flex flex-col gap-4">
                                            <span>Status : Cannot Refund</span>
                                            <span>"After booking this event, you cannot refund money."</span>
                                        </div>
                                    </>
                                )
                                : refund !== null
                                    ? (
                                        <>
                                            <div>
                                                <span>"You have 24 hours after the event to request a refund. The refund amount will be 80%."</span>
                                            </div>
                                        </>
                                    )
                                    : ""}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-12">
                        <p className="font-bold text-xl">Organized by</p>
                        <div className="p-4 flex flex-col gap-8 bg-slate-200 rounded-lg">
                            <div className="flex gap-4 items-center mb-4">
                                <RxAvatar size={50} />
                                <span>creator name</span>
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
