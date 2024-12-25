"use client"

import { use } from "react"

import Header from "@components/layout/Header"
import Footer from "@components/layout/Footer"
import EventDetail from "@components/layout/EventDetail"
import events from "@model/eventData"

const Page = ({ params }) => {

    const unwrappedParams = use(params)
    const eventId = Number(unwrappedParams.id)
    const event = events.find(event => event.id === eventId)


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
                    eventQr={event.eventQr}
                    bookOtp="false"
                    pageEvent="history"
                />
            ) : (
                <p>No event found with ID {unwrappedParams.id}</p>
            )}

            <Footer />
        </div>
    )
}

export default Page;