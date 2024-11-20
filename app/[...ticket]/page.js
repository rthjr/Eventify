"use client";
import { useState } from "react";
import { use } from "react"; // Import the use hook
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";

// components
import Free from "../../components/Tickets/Free"
import Open from "../../components/Tickets/Open"
import Paid from "../../components/Tickets/Paid"

export default function TicketType({ params }) {

  const [events] = useState([
    { id: 1, imageEvent: "/assets/banner/conference.jpg", eventName: "Tech Summit", date: "Today", creatorName: "Giga", ticketEvent: "open", typeEvent: "Early Bird", location: "San Francisco", eventQr: "/assets/banner/fakeQR.png" },
    { id: 2, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Marathon 2025", date: "Tomorrow", creatorName: "RunClub", ticketEvent: "open", typeEvent: "Regular", location: "New York", eventQr: "/assets/banner/fakeQR.png" },
    { id: 3, imageEvent: "/assets/banner/techEvent.jpg", eventName: "Innovation Expo", date: "Today", creatorName: "TechWorld", ticketEvent: "open", typeEvent: "Regular", location: "Los Angeles", eventQr: "/assets/banner/fakeQR.png" },
    { id: 4, imageEvent: "/assets/banner/conference2.jpg", eventName: "AI Conference", date: "Month", creatorName: "Giga AI", ticketEvent: "Free", typeEvent: "Late", location: "Boston", eventQr: "/assets/banner/fakeQR.png" },
    { id: 5, imageEvent: "/assets/banner/conference.jpg", eventName: "Business Workshop", date: "Today", creatorName: "BizPro", ticketEvent: "open", typeEvent: "Early Bird", location: "Chicago", eventQr: "/assets/banner/fakeQR.png" },
    { id: 6, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Soccer Finals", date: "Tomorrow", creatorName: "SportsMania", ticketEvent: "open", typeEvent: "Regular", location: "Dallas", eventQr: "/assets/banner/fakeQR.png" },
    { id: 7, imageEvent: "/assets/banner/techEvent.jpg", eventName: "StartUp Launchpad", date: "Month", creatorName: "LaunchZone", ticketEvent: "open", typeEvent: "Regular", location: "Seattle", eventQr: "/assets/banner/fakeQR.png" },
    { id: 8, imageEvent: "/assets/banner/conference2.jpg", eventName: "Healthcare Symposium", date: "Tomorrow", creatorName: "MedPlus", ticketEvent: "paid", typeEvent: "Early Bird", location: "Miami", eventQr: "/assets/banner/fakeQR.png" },
    { id: 9, imageEvent: "/assets/banner/conference2.jpg", eventName: "Global Finance Meet", date: "Month", creatorName: "FinCon", ticketEvent: "open", typeEvent: "Regular", location: "London", eventQr: "/assets/banner/fakeQR.png" },
  ]);

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
