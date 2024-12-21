import React from 'react';
import Image from 'next/image';

const EventCard = ({ imageSrc, eventType, onClick }) => {

  const handleClick = () => {
    if (onClick) {
      onClick(eventType); 
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-72 h-48 rounded-lg overflow-hidden shadow-sm lg:shadow-lg flex items-center justify-center bg-white group">
      <div className="absolute inset-0 transition-transform transform group-hover:scale-110 group-hover:blur-sm">
        <Image src={imageSrc} alt={eventType} layout="fill" objectFit="cover" />
      </div>
      <div className="relative z-10 bg-black bg-opacity-50 text-white p-4 rounded-md text-center">
        <h2 className="text-lg font-semibold transition-transform transform group-hover:scale-110">
          {eventType}
        </h2>
      </div>
    </div>
  );
};

export default EventCard;