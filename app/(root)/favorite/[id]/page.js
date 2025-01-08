"use client";
import { use } from "react"; // Import the use hook
// compornent
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import EventDetail from "@components/layout/EventDetail";
import { useState } from "react";
import { useEffect } from "react";

const Page = ({ params }) => {

  const unwrappedParams = use(params); // Unwrap the params Promise
  const eventId = Number(unwrappedParams.id); // Convert unwrappedParams.id to a number
  const [events, setEvents] = useState([])
  const event = events.find(event => event.id === eventId);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify');
        const result = await response.json();
        setEvents(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <div>
      <Header />
      {event ? (
        <EventDetail
          key={event.id}
          ticket={event.id}
          imageUrl={event.imageUrl}
          name={event.name}
          date={event.date}
          ticketType={event.ticketType}
          eventType={event.eventType}
          location={event.location}
          refund={event.refund}
          description={event.description}
          bookOtp="true"
          pageEvent="favorite"
        />
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
}

export default Page;