"use client";

import React, { useState } from "react";
import CardEvent from "@components/FormCard/CardEvent";
import Button from "@components/Button/Button";
import events from "../../model/eventData"; // Import the data

const EventCard = ({ page, categoryDis, searchQuery }) => {
    const [visibleCount, setVisibleCount] = useState(8); // Number of visible cards

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 4); // Show 4 more events
    };

    // Filter events based on categoryDis and searchQuery
    const searchEvent = events.filter((event) => {
        const matchesCategory =
            categoryDis === "All" || !categoryDis || event.eventCategory === categoryDis;
        const matchesSearchQuery =
            !searchQuery || event.eventName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    return (
        <>
            <div className="flex w-full flex-wrap justify-center gap-9">
                {searchEvent.slice(0, visibleCount).map((event) => (
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
                    />
                ))}
            </div>
            <div className="w-full flex items-center justify-center mt-12">
                {visibleCount < searchEvent.length && (
                    <Button param="See More" onClick={handleSeeMore} />
                )}
            </div>
        </>
    );
};

export default EventCard;
