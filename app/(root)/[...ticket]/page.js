"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import events from "@model/eventData";
// components
import Open from "@components/Tickets/Open";
import Paid from "@components/Tickets/Paid";
import Free from "@components/Tickets/Free";
import Error404 from "../404";

export default function TicketType({ params }) {
  // Unwrap params using React's `use()` hook
  const unwrappedParams = use(params);
  const { ticket } = unwrappedParams; // Extract the ticket from unwrapped params

  const searchParams = useSearchParams(); // Get query parameters
  const pageEvent = searchParams.get("pageEvent"); // Extract pageEvent

  const eventId = Number(ticket); // Convert ticket to a number
  const event = events.find((event) => event.id === eventId);

  // Check if the event was found
  if (!event) {
    return <Error404 />; // Or some other fallback UI
  }

  // Match the pageEvent to determine which component to render
  return (
    <div>
      {event.ticketEvent?.toLowerCase() === "open" ? (
        <Open
          key={event.id}
          ticket={event.id}
          imageEvent={event.imageEvent}
          eventName={event.eventName}
          date={event.date}
          ticketEvent={event.ticketEvent}
          typeEvent={event.typeEvent}
          location={event.location}
          eventQr={event.qr}
          page={pageEvent}
        />
      ) : event.ticketEvent?.toLowerCase() === "free" ? (
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
          eventQr={event.qr}
          page={pageEvent}
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
          eventQr={event.qr}
          page={pageEvent}
        />
      )}
    </div>
  );
}
