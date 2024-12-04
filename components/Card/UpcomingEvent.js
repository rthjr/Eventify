"use client"
import React, { useState } from 'react'
import CardEvent from '@components/FormCard/CardEvent'
import Button from '@components/Button/Button'
import events from '@model/eventData'

const UpcomingEvent = () => {

    // Initial number of visible cards
    const [visibleCount, setVisibleCount] = useState(8);

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <>
            <div className='flex w-full flex-wrap justify-center gap-9'>
                {events.slice(0, visibleCount).map((event) => (
                    <CardEvent
                        key={event.id}
                        id={event.id}
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
            <div className='w-full flex items-center justify-center mt-12'>
                {visibleCount < events.length && (
                    <Button
                        onClick={handleSeeMore}
                        param="See More"
                    />
                )}
            </div>
        </>
    )
}

export default UpcomingEvent