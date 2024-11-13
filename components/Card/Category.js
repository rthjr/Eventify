"use client";

import React, { useState } from 'react';
import EventCard from '../FormCard/DisplayCategory';
import Link from 'next/link';

const EventPage = () => {
  const [events, setEvents] = useState([
    { imageSrc: '/assets/banner/conference.jpg', eventType: 'Conference' },
    { imageSrc: '/assets/banner/technology.jpg', eventType: 'Technology' },
    { imageSrc: '/assets/banner/sport.jpg', eventType: 'Sport' },
    { imageSrc: '/assets/banner/conference.jpg', eventType: 'Conference' },
    
    { imageSrc: '/assets/banner/sport.jpg', eventType: 'Sport' },
  ]);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:flex flex-wrap gap-7 justify-between items-center">
        {events.map((event, index) => (
          <Link href="/" key={index}>
            <EventCard
              imageSrc={event.imageSrc}
              eventType={event.eventType}
            />
          </Link>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex lg:hidden overflow-x-auto space-x-4 p-4">
        {events.map((event, index) => (
          <Link href="/" key={index}>
            <EventCard
              imageSrc={event.imageSrc}
              eventType={event.eventType}
              className="min-w-[70%] sm:min-w-[50%] md:min-w-[40%]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
