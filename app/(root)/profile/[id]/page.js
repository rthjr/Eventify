"use client";
import { useState } from "react";
import { use } from "react"; // Import the use hook
import { useEffect } from "react";

// compornent
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import EventDetail from "@components/layout/EventDetail";

const Page = ({ params }) => {

    const [events, setEvents] = useState([]);

    // fetch api
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify')
                const result = await response.json();
                setEvents(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    
    const unwrappedParams = use(params); // Unwrap the params Promise
    const eventId = Number(unwrappedParams.id); // Convert unwrappedParams.id to a number
    const event = events.find(event => event.id === eventId);


    return (
        <div>
            <Header />
            {event ? (
                <EventDetail
                    key={event.id}
                    imageUrl={event.imageUrl}
                    name={event.name}
                    date={event.date}
                    creatorName={event.owner}
                    ticketType={event.ticketType}
                    eventType={event.eventType}
                    location={event.location}
                    description={event.description}
                    refund={event.refund}
                    bookOtp="false"
                    pageEvent="profile"
                />
            ) : (
                <p>No event found with ID {unwrappedParams.id}</p>
            )}
            <Footer />
        </div>
    );
}

export default Page;