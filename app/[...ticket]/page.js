"use client";
import { useState } from "react";
import { use } from "react"; // Import the use hook
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import events from "@model/eventData";
// components
import Open from "@components/Tickets/Open"
import Paid from "@components/Tickets/Paid"
import Free from "@components/Tickets/Free";

export default function TicketType({ params }) {

  const unwrappedParams = use(params); // Unwrap the params Promise
  const eventId = Number(unwrappedParams.ticket); // Convert unwrappedParams.id to a number
  const event = events.find(event => event.id === eventId);

  // Check if the event was found
  if (!event) {
    return <div>Event not found</div>; // Or some other fallback UI
  }

  return (
    <div>
      {event.ticketEvent.toLowerCase() === "open" ? (
        <Open
          key={event.id}
          ticket={event.id}
          imageEvent={event.imageEvent}
          eventName={event.eventName}
          date={event.date}
          ticketEvent={event.ticketEvent}
          typeEvent={event.typeEvent}
          location={event.location}
          eventQr={event.eventQr}
        />
      ) : event.ticketEvent.toLowerCase() === "free" ? (
        <Free
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
      ) : (
        <Paid
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
      )}
    </div>
  )
}
