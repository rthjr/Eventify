"use client";
import { useState, useEffect } from "react";
import React from "react";

const Dashboard = ({ email }) => {
  const [eventsData, setEventsData] = useState({
    totalEvent: 0,
    totalBooked: 0,
    totalUpComing: 0,
  });

  const [filter, setFilter] = useState("month");

  // Fetch API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify"
        );
        const result = await response.json();

        // Filter data
        const filteredBook = result.filter(
          (row) => row.registerEmail && row.registerEmail.includes(email)
        );
        const filteredEvents = result.filter((event) => event.owner === email);

        const totalEvents = filteredEvents.length;
        const totalBooked = filteredBook.length;


        // filtered up coming event
        const currentDate = new Date();
        const totalUpComing = filteredEvents.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate > currentDate;
        }).length;

        setEventsData({ 
          totalEvent: totalEvents,
          totalBooked: totalBooked,
          totalUpComing: totalUpComing,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [email]); // Ensure `email` is part of dependencies

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="font-bold w-full text-lg flex flex-col p-4 gap-8">
      <h2 className="text-2xl">Dashboard</h2>

      {/* Filter by month day week */}
      <div className="flex justify-between mb-4">
        <label htmlFor="filter" className="mr-2 text-lg font-medium">
          Filter by:
        </label>
        <select
          id="filter"
          className="border rounded px-2 py-1 bg-white font-medium border-black"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 justify-center lg:justify-between">
        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">{eventsData.totalEvent}</h2>
          <span className="font-light">My Total Event</span>
        </div>

        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">{eventsData.totalBooked}</h2>
          <span className="font-light">Total Booked</span>
        </div>

        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">{eventsData.totalUpComing}</h2>
          <span className="font-light">Up Coming Event</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
