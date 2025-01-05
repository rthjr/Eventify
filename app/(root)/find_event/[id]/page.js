"use client";
import { use } from "react"; // Import the use hook
// compornent
import Header from "@components/layout/Header";
import { useSearchParams } from "@node_modules/next/navigation";
import Footer from "@components/layout/Footer";
import EventDetail from "@components/layout/EventDetail";
import { useEffect, useState } from "react";

const Page = ({ params }) => {

  const [eventData, setEventData] = useState([])
  const searchParams = useSearchParams();
  const unwrappedParams = use(params); // Unwrap the params Promise
  const eventId = Number(unwrappedParams.id); // Convert unwrappedParams.id to a number
  const event = eventData.find(event => event.id === eventId);
  const pageEvent = searchParams.get("pageEvent") || "find_event";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify');
        const result = await response.json();
        setEventData(result);
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
          // missed
          // creatorName={event.creatorName}
          // missed
          // ticketEvent={event.ticketEvent}
          eventType={event.eventType}
          location={event.location}
          refund={event.refund}
          description = {event.description}
          bookOtp="true"
          pageEvent={pageEvent}

        />
      ) : (
        <p>No event found with ID {unwrappedParams.id}</p>
      )}
      <Footer />
    </div>
  );
}

export default Page;