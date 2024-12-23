"use client";
import React, { useEffect, useState } from "react";
import CardEvent from "@components/FormCard/CardEvent";
import Button from "@components/Button/Button";
import events from "../../model/eventData"; // Import the data

const EventCard = () => {

    const [visibleCount, setVisibleCount] = useState(8);
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

    if(!eventData) {
        return <div>
            loading...
        </div>
    }

     // Number of visible cards

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 4); // Show 4 more events
    };

    return (
        <>
            <div className="flex w-full flex-wrap justify-center gap-9">
            
                {eventData.map((event) => ( 
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
            <div className="w-full flex items-center justify-center mt-12">
                {visibleCount < events.length && (
                    <Button param="See More" onClick={handleSeeMore} />
                )}
            </div>
        </>
    );
};

export default EventCard;
