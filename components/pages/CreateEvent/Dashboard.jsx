"use client"
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

const Dashboard = () => {
  const [eventsData, setEventsData] = useState({
    totalEvent: 0,
    totalBooked: 0,
    totalUpComing: 0,
  });

  const [filter, setFilter] = useState("month"); 

  // fetch api
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/eventify")

        const result = await response.json()

        // display all event validate by email of that creator
        const totalEvent = result 

        // search every event that have that email and find the register, avoid dubplicate
        

        // search every event that have that email and also validate 
        
      } catch (error) {
        console.log("Error fetchin data", error);
      }
    }
  })

  // Handle filter change
  const handleFilterChange = () => {
  };

  return (
    <div className="font-bold w-full text-lg flex flex-col p-4 gap-8">
      <h2 className="text-2xl">Dashboard</h2>

      {/* filter by month day week  */}
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
          <h2 className="text-7xl">10</h2>
          <span className="font-light">My Total Event</span>
        </div>

        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">35</h2>
          <span className="font-light">Total Booked</span>
        </div>

        <div className="flex flex-col justify-center items-center p-4 w-52 h-52 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-7xl">5</h2>
          <span className="font-light">Up Coming Event</span>
        </div>
      </div>

      {/* <Table param={thNames} /> */}
    </div>
  );
};

export default Dashboard;
