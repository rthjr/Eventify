"use client";
import { useState } from "react";
import { use } from "react"; // Import the use hook
// compornent
import Header from "@components/Header";
import Footer from "@components/Footer";
import EventDetail from "@components/EventDetail";
import events from "@model/eventData";

const Page = ({ params }) => {

  const unwrappedParams = use(params); // Unwrap the params Promise
  const eventId = Number(unwrappedParams.id); // Convert unwrappedParams.id to a number
  const event = events.find(event => event.id === eventId);


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
          eventQr = {event.eventQr}
          bookOtp="true"
        />
      ) : (
        <p>No event found with ID {unwrappedParams.id}</p>
      )}
      <Footer />
    </div>
  );
}

export default Page;