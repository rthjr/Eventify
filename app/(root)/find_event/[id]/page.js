"use client";
import { use } from "react"; // Import the use hook
// compornent
import Header from "@components/layout/Header";
import { useSearchParams } from "@node_modules/next/navigation";
import Footer from "@components/layout/Footer";
import EventDetail from "@components/layout/EventDetail";
import events from "@model/eventData";

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const unwrappedParams = use(params); // Unwrap the params Promise
  const eventId = Number(unwrappedParams.id); // Convert unwrappedParams.id to a number
  const event = events.find(event => event.id === eventId);
  const pageEvent = searchParams.get("pageEvent") || "find_event"; 

  return (
    <div>
      <Header />
      {event ? (
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
          eventQr = {event.qr}
          bookOtp="true"
          pageEvent = {pageEvent}

        />
      ) : (
        <p>No event found with ID {unwrappedParams.id}</p>
      )}
      <Footer />
    </div>
  );
}

export default Page;