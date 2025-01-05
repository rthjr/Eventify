"use client";
import React, { useState, useEffect } from "react";
import CardEvent from "@components/FormCard/CardEvent";
import Button from "@components/Button/Button";

const UpcomingEvent = ({ page, categoryDis, searchQuery }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/eventify");
        const result = await response.json();
        setEventData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const isUpcomingEvent = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj > today;
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // Filter upcoming events
  const filteredEvents = eventData.filter((event) => {
    const isUpcoming = isUpcomingEvent(event.date);
    const matchesCategory =
      categoryDis === "All" || !categoryDis || event.category === categoryDis;
    const matchesSearchQuery =
      !searchQuery || event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return isUpcoming && matchesCategory && matchesSearchQuery;
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
  );
};

export default UpcomingEvent;
