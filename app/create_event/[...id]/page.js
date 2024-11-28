"use client"

import { useState, useEffect } from "react";
import EventDetail from "@components/EventDetail";
import { use } from "react"; // Import `use` from React

const DynamicRoutePage = ({ params }) => {
    // Unwrap params using React.use()
    const unwrappedParams = use(params);

    // Use state for events data
    const [events] = useState([
        { id: 1, imageEvent: "/assets/banner/conference.jpg", eventName: "Tech Summit", date: "2024-11-26", creatorName: "Giga", ticketEvent: "open", typeEvent: "Early Bird", location: "San Francisco", eventQr: "/assets/banner/fakeQR.png" },
        { id: 2, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Marathon 2025", date: "2025-01-01", creatorName: "RunClub", ticketEvent: "open", typeEvent: "Regular", location: "New York", eventQr: "/assets/banner/fakeQR.png" },
        { id: 3, imageEvent: "/assets/banner/techEvent.jpg", eventName: "Innovation Expo", date: "2024-11-26", creatorName: "TechWorld", ticketEvent: "open", typeEvent: "Regular", location: "Los Angeles", eventQr: "/assets/banner/fakeQR.png" },
        { id: 4, imageEvent: "/assets/banner/conference2.jpg", eventName: "AI Conference", date: "2024-12-01", creatorName: "Giga AI", ticketEvent: "Free", typeEvent: "Late", location: "Boston", eventQr: "/assets/banner/fakeQR.png" },
        { id: 5, imageEvent: "/assets/banner/conference.jpg", eventName: "Business Workshop", date: "2024-11-26", creatorName: "BizPro", ticketEvent: "open", typeEvent: "Early Bird", location: "Chicago", eventQr: "/assets/banner/fakeQR.png" },
        { id: 6, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Soccer Finals", date: "2024-11-27", creatorName: "SportsMania", ticketEvent: "open", typeEvent: "Regular", location: "Dallas", eventQr: "/assets/banner/fakeQR.png" },
        { id: 7, imageEvent: "/assets/banner/techEvent.jpg", eventName: "StartUp Launchpad", date: "2024-12-15", creatorName: "LaunchZone", ticketEvent: "open", typeEvent: "Regular", location: "Seattle", eventQr: "/assets/banner/fakeQR.png" },
        { id: 8, imageEvent: "/assets/banner/conference2.jpg", eventName: "Healthcare Symposium", date: "2024-11-27", creatorName: "MedPlus", ticketEvent: "paid", typeEvent: "Early Bird", location: "Miami", eventQr: "/assets/banner/fakeQR.png" },
        { id: 9, imageEvent: "/assets/banner/conference2.jpg", eventName: "Global Finance Meet", date: "2024-12-05", creatorName: "FinCon", ticketEvent: "open", typeEvent: "Regular", location: "London", eventQr: "/assets/banner/fakeQR.png" },
    ]);

    // Ensure params are available before destructuring
    if (!unwrappedParams) {
        return <div>Loading...</div>;
    }

    // Check if `id` is a string or an array
    const { id } = unwrappedParams;

    let eventId, eventDate;
    if (typeof id === "string") {
        // Split if id is a string
        [eventId, eventDate] = id.split(",");
    } else if (Array.isArray(id)) {
        // If id is an array, use the first item as the event ID and the second as the date
        [eventId, eventDate] = id;
    }

    const eventIdNumber = Number(eventId);

    // Find event by eventId
    const event = events.find((event) => event.id === eventIdNumber);

    // Get today's date
    const today = new Date();
    const eventDateObj = new Date(event.date);

    // Calculate the difference in days
    const timeDiff = eventDateObj - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days

    const upcomingEvent = dayDiff >= 0; // Check if the event is upcoming

    return (
        <div>
            <h1>Dynamic Route Page</h1>
            <p>Event ID: {eventIdNumber}</p>
            <p>Event Date: {event.date}</p>
            <p>Days until event: {dayDiff} days</p>
            <p>{upcomingEvent ? "This event is upcoming!" : "This event is in the past"}</p>

            <EventDetail
                key={event.id}
                ticket={event.id}
                imageEvent={event.imageEvent}
                eventName={event.eventName}
                date={event.date}
                creatorName={event.creatorName}
                ticketEvent={event.ticketEvent}
                typeEvent={event.typeEvent}
                location={event.location}
                eventQr={event.eventQr}
            />
        </div>
    );
};

export default DynamicRoutePage;
