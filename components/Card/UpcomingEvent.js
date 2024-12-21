"use client"
import React, { useState } from 'react'
import CardEvent from '@components/FormCard/CardEvent'
import Button from '@components/Button/Button'
import events from '@model/eventData'

const UpcomingEvent = ({ page, categoryDis, searchQuery }) => {

    // Initial number of visible cards
    const [visibleCount, setVisibleCount] = useState(8);

    const handleSeeMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    // Filter events based on categoryDis and searchQuery
    const filteredEvents = events.filter((event) => {
        const matchesCategory =
            categoryDis === "All" || !categoryDis || event.eventCategory === categoryDis;
        const matchesSearchQuery =
            !searchQuery || event.eventName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });


    return (
        <>
            <div className="flex w-full flex-wrap justify-center gap-9">
                {filteredEvents.slice(0, visibleCount).map((event) => (
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
                        page={page}
                        searchQuery={searchQuery}
                    />
                ))}
            </div>
            <div className="w-full flex items-center justify-center mt-12">
                {visibleCount < filteredEvents.length && (
                    <Button param="See More" onClick={handleSeeMore} />
                )}
            </div>
        </>
    )
}

export default UpcomingEvent