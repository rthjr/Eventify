"use client";

import EventCard from '../FormCard/DisplayCategory';
import { useEffect } from 'react';
import { useState } from 'react';

const EventPage = ({ onClick }) => {

  const [eventData, setEventData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/category');
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

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:flex gap-7 justify-between items-center overflow-x-auto whitespace-nowrap">
        {eventData.map((event, index) => (
          <div key={index}>
            <EventCard
              imageSrc={event.imageSrc}
              eventType={event.name}
              onClick={onClick}
            />
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex lg:hidden overflow-x-auto space-x-4 p-4">
        {eventData.map((event, index) => (
          <div key={index}>
            <EventCard
              imageSrc={event.imageSrc}
              eventType={event.name}
              className="min-w-[70%] sm:min-w-[50%] md:min-w-[40%]"

              onClick={onClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
