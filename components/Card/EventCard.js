"use client"
import React, { useState } from 'react'
import CardEvent from '@components/FormCard/CardEvent'

const EventCard = () => {
    const [events] = useState([
        { id: 1, imageEvent: "/assets/banner/conference.jpg", eventName: "Tech Summit", date: "12/3/2025", creatorName: "Giga", ticketEvent: "open", typeEvent: "Early Bird", location: "San Francisco" },
        { id: 2, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Marathon 2025", date: "12/4/2025", creatorName: "RunClub", ticketEvent: "open", typeEvent: "Regular", location: "New York" },
        { id: 3, imageEvent: "/assets/banner/techEvent.jpg", eventName: "Innovation Expo", date: "12/5/2025", creatorName: "TechWorld", ticketEvent: "open", typeEvent: "VIP", location: "Los Angeles" },
        { id: 4, imageEvent: "/assets/banner/conference2.jpg", eventName: "AI Conference", date: "12/6/2025", creatorName: "Giga AI", ticketEvent: "closed", typeEvent: "Late", location: "Boston" },
        { id: 5, imageEvent: "/assets/banner/conference.jpg", eventName: "Business Workshop", date: "12/7/2025", creatorName: "BizPro", ticketEvent: "open", typeEvent: "Early Bird", location: "Chicago" },
        { id: 6, imageEvent: "/assets/banner/sportEvent.jpg", eventName: "Soccer Finals", date: "12/8/2025", creatorName: "SportsMania", ticketEvent: "open", typeEvent: "VIP", location: "Dallas" },
        { id: 7, imageEvent: "/assets/banner/techEvent.jpg", eventName: "StartUp Launchpad", date: "12/9/2025", creatorName: "LaunchZone", ticketEvent: "open", typeEvent: "Regular", location: "Seattle" },
        { id: 8, imageEvent: "/assets/banner/conference2.jpg", eventName: "Healthcare Symposium", date: "12/10/2025", creatorName: "MedPlus", ticketEvent: "closed", typeEvent: "Early Bird", location: "Miami" },
        { id: 9, imageEvent: "/assets/banner/conference2.jpg", eventName: "Global Finance Meet", date: "12/11/2025", creatorName: "FinCon", ticketEvent: "open", typeEvent: "Regular", location: "London" },
    ]);

    // Initial number of visible cards
    const [visibleCount, setVisibleCount] = useState(5);

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <>
            <div className='flex w-full justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9'>
                    {events.slice(0, visibleCount).map((event) => (
                        <CardEvent
                            key={event.id}
                            imageEvent={event.imageEvent}
                            eventName={event.eventName}
                            date={event.date}
                            creatorName={event.creatorName}
                            ticketEvent={event.ticketEvent}
                            typeEvent={event.typeEvent}
                            location={event.location}
                        />
                    ))}
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                {visibleCount < events.length && (
                    <button onClick={handleSeeMore} className='mt-12 p-3 bg-customPurple-default hover:bg-customPurple-hover transition-all text-white rounded'>
                        See More
                    </button>
                )}
            </div>
        </>
    )
}

export default EventCard;