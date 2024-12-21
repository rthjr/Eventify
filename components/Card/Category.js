"use client";

import EventCard from '../FormCard/DisplayCategory';
import category from '@model/categoryData';

const EventPage = ({onClick}) => {
 

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:flex flex-wrap gap-7 justify-between items-center">
        {category.map((event, index) => (
          <div key={index}>
            <EventCard
              imageSrc={event.imageSrc}
              eventType={event.eventType}
              onClick = {onClick}
            />
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex lg:hidden overflow-x-auto space-x-4 p-4">
        {category.map((event, index) => (
          <div key={index}>
            <EventCard
              imageSrc={event.imageSrc}
              eventType={event.eventType}
              className="min-w-[70%] sm:min-w-[50%] md:min-w-[40%]"
              
              onClick = {onClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
