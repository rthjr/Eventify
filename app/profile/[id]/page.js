"use client";
import { useState } from "react";
import { use } from "react"; // Import the use hook

// compornent
import Header from "@components/Header";
import Footer from "@components/Footer";
import EventDetail from "@components/EventDetail";

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
                <EventDetail
                    key={event.id}
                    imageEvent={event.imageEvent}
                    eventName={event.eventName}
                    date={event.date}
                    creatorName={event.creatorName}
                    ticketEvent={event.ticketEvent}
                    typeEvent={event.typeEvent}
                    location={event.location}
                    bookOtp="false"
                />
            ) : (
                <p>No event found with ID {unwrappedParams.id}</p>
            )}
            <Footer />
        </div>
    );
}

export default Page;