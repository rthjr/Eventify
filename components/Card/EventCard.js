"use client";
import React, { useEffect, useState } from "react";
import CardEvent from "@components/FormCard/CardEvent";
import Button from "@components/Button/Button";

const EventCard = ({ page, searchQuery, categoryDis }) => {

    const [visibleCount, setVisibleCount] = useState(6);
    const [eventData, setEventData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify');
                const result = await response.json();
                setEventData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    if (!eventData) {
        return <div>
            loading...
        </div>
    }

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };
    
    const filteredEvents = eventData.filter((event) => {
        const matchesCategory =
            !categoryDis || categoryDis === "All" || event.eventCategory === categoryDis;
        const matchesSearchQuery =
            !searchQuery || event.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    return (
        <>
            <div className="flex w-full flex-wrap justify-center gap-9">    

                {filteredEvents.slice(0, visibleCount).map((event) => (
                    <CardEvent
                        key={event.id}
                        id={event.id}
                        name = {event.name}
                        date = {event.date}
                        startTime = {event.startTime}
                        endTime = {event.endTime}
                        imageUrl = {event.imageUrl}
                    />
                ))}
            </div>
            <div className="w-full flex items-center justify-center mt-12">
                {visibleCount < filteredEvents.length && (
                    <Button param="See More" onClick={handleSeeMore} />
                )}
            </div>
        </>
    );
};

export default EventCard;
