"use client"

import EventDetail from "@components/layout/EventDetail";
import { use } from "react"; // Import `use` from React
import events from "@model/eventData";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

const DynamicRoutePage = ({ params }) => {
    // Unwrap params using React.use()
    const unwrappedParams = use(params);

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
            <Header/>
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
            <Footer/>
        </div>
    );
};

export default DynamicRoutePage;
