"use client";
import { useState } from "react";
import { use } from "react"; // Import the use hook
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";

// compornent
import Header from "@components/Header";
import Footer from "@components/Footer";

// react icon
import { IoLocation } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

const Page = ({ params }) => {
  const [events] = useState([
    { id: 1, imageEvent: "/assets/banner/conference.jpg", eventName: "Tech Summit", date: "Today", creatorName: "Giga", ticketEvent: "open", typeEvent: "Early Bird", location: "San Francisco" },
    { id: 2, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Marathon 2025", date: "Tomorrow", creatorName: "RunClub", ticketEvent: "open", typeEvent: "Regular", location: "New York" },
    { id: 3, imageEvent: "/assets/banner/techEvent.jpg", eventName: "Innovation Expo", date: "Today", creatorName: "TechWorld", ticketEvent: "open", typeEvent: "Regular", location: "Los Angeles" },
    { id: 4, imageEvent: "/assets/banner/conference2.jpg", eventName: "AI Conference", date: "Month", creatorName: "Giga AI", ticketEvent: "Free", typeEvent: "Late", location: "Boston" },
    { id: 5, imageEvent: "/assets/banner/conference.jpg", eventName: "Business Workshop", date: "Today", creatorName: "BizPro", ticketEvent: "open", typeEvent: "Early Bird", location: "Chicago" },
    { id: 6, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Soccer Finals", date: "Tomorrow", creatorName: "SportsMania", ticketEvent: "open", typeEvent: "Regular", location: "Dallas" },
    { id: 7, imageEvent: "/assets/banner/techEvent.jpg", eventName: "StartUp Launchpad", date: "Month", creatorName: "LaunchZone", ticketEvent: "open", typeEvent: "Regular", location: "Seattle" },
    { id: 8, imageEvent: "/assets/banner/conference2.jpg", eventName: "Healthcare Symposium", date: "Tomorrow", creatorName: "MedPlus", ticketEvent: "paid", typeEvent: "Early Bird", location: "Miami" },
    { id: 9, imageEvent: "/assets/banner/conference2.jpg", eventName: "Global Finance Meet", date: "Month", creatorName: "FinCon", ticketEvent: "open", typeEvent: "Regular", location: "London" },
  ]);

  const unwrappedParams = use(params); // Unwrap the params Promise
  const eventId = Number(unwrappedParams.id); // Convert unwrappedParams.id to a number
  const event = events.find(event => event.id === eventId);


  return (
    <div>
      <Header />
      {event ? (
        <div className="w-full h-auto my-20  flex flex-col justify-center items-center">
          <div className="w-8/12 flex flex-col justify-center items-center">
            <div className="w-full h-full flex flex-col">
              <div className="w-auto h-[500px] overflow-hidden rounded-lg relative mb-8 -z-20 shadow-gray shadow-xl ">
                <Image
                  src={event.imageEvent}
                  alt={event.eventName}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="flex justify-between mb-12">
                <h2 className="font-bold text-2xl">{event.eventName}</h2>

                <div className="relative">
                  <div className="flex flex-col gap-2 absolute top-0 right-0">
                    <p className="font-semibold text-green-500">{event.ticketEvent}</p>

                    <Link href={`/${event.id}`}>
                      <button className="p-3 bg-customPurple-default hover:bg-customPurple-hover transition-all text-white rounded-lg">
                        Book
                      </button>
                    </Link>

                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-12">
                <p className="font-bold text-xl">Type of Event</p>
                <span className="font-semibold text-green-500"> {event.typeEvent}</span>
              </div>

              <div className="flex flex-col gap-2 mb-12">
                <p className="font-bold text-xl">Date and Time</p>
                <span>{event.date}</span>
              </div>

              <div className="flex flex-col gap-2 mb-12">
                <p className="font-bold text-xl">Location</p>
                <div className="flex gap-4">
                  <IoLocation
                    size={50}
                  />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-12">
                <p className="font-bold text-xl">Show Map</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.978511266007!2d104.94329991169158!3d11.481475538666379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310959f3e2eaeca3%3A0x837121df56bef030!2sTa%20Khmau%2C%20Krong%20Ta%20Khmau!5e0!3m2!1sen!2skh!4v1731726698814!5m2!1sen!2skh"
                  width="600"
                  height="400"
                  allowFullScreen
                  title="Example Video"
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
                <p className="font-bold text-xl">Organizer by</p>

                <div className="p-4 flex flex-col gap-8 bg-slate-200 rounded-lg">
                  <div className="flex gap-4  items-center mb-4">
                    <RxAvatar
                      size={50}
                    />
                    <span>{event.creatorName}</span>
                  </div>

                  <div className="mb-4">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus deserunt non commodi pariatur ipsam! Cupiditate hic et nisi officia eius dolore necessitatibus earum magnam ipsum possimus ad, odit quibusdam dignissimos.</p>
                  </div>

                  <div>
                    <p className="font-bold text-xl">Contact</p>
                    <span>email : asdfasdfj@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No event found with ID {unwrappedParams.id}</p>
      )}
      <Footer />
    </div>
  );
}

export default Page;